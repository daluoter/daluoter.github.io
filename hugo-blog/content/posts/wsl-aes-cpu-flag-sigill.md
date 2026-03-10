---
title: "WSL 缺少 AES CPU Flag 導致 SIGILL：從 Google Antigravity 崩潰到 BIOS 設定的完整排查"
date: 2026-03-10
draft: false
description: "記錄在 WSL 環境下執行程式時，遭遇語言伺服器因為缺少 AES CPU Flag 而發生 SIGILL 崩潰的排查過程與解決方法。"
tags: ["WSL", "Linux", "Debug", "SIGILL"]
categories: ["技術"]
---

### 前言：
最近在 WSL (Windows Subsystem for Linux) 環境下執行 **Google Antigravity** 時，遇到了一個錯誤，導致無法和 Agent 進行對話：

> `Language server killed with signal SIGILL`  
> `Failed to start language server`

同樣的 Workspace 在 Windows 環境下運行完全正常，但只要 Remote 到 WSL 就會崩潰。這篇文章記錄了 Debug 的完整排查過程。

---

## 環境資訊
為了方便對照，以下是我的測試環境：

<div style="background: rgba(17,34,64,0.6); border: 1px solid rgba(100,255,218,0.15); border-radius: 10px; padding: 28px 32px; margin: 30px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px;">
  <div>
    <span style="color: #64ffda; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Host 系統</span><br>
    <span style="color: #e6f1ff; font-size: 16px;">Windows 11 Pro (Build 26200)</span>
  </div>
  <div>
    <span style="color: #64ffda; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">CPU</span><br>
    <span style="color: #e6f1ff; font-size: 16px;">Intel Core i7-12700</span>
  </div>
  <div>
    <span style="color: #64ffda; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">WSL 版本</span><br>
    <span style="color: #e6f1ff; font-size: 16px;">2.6.3.0 (Kernel: 6.6.87.2)</span>
  </div>
  <div>
    <span style="color: #64ffda; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Linux 發行版</span><br>
    <span style="color: #e6f1ff; font-size: 16px;">Ubuntu 22.04 / 24.04 (現象一致)</span>
  </div>
</div>

---

## 問題現象：SIGILL (Illegal Instruction)
當 Google Antigravity 啟動 Language Server 時，系統直接拋出 `SIGILL`。  
在 Linux 中，這代表程式嘗試執行一個 **CPU 硬體不支援或不允許的指令**。

### 第一步：檢查 CPU 指令集
我一開始懷疑是 WSL 沒抓到正確的指令集。在 WSL 中執行檢查：

```bash
grep -m1 -o 'aes' /proc/cpuinfo || echo "NO_AES"
```
結果： `NO_AES`

再查看完整的 flags：

```bash
grep -m1 '^flags' /proc/cpuinfo
```
輸出範例： `fpu vme de ... pclmulqdq ... avx avx2 sha_ni ...`

奇怪的是，AVX、AVX2、SHA 都在，唯獨 `aes` 消失了。

## 排查過程：(那些我走過的彎路)

### 1. 懷疑 Hyper-V 與 VBS 的衝突
由於 WSL2 運作在輕量化 Hyper-V 之上，我懷疑是 Windows 的「虛擬化安全性 (VBS)」過濾掉了部分指令集。

- 檢查 `systeminfo`，確認「虛擬化型安全性」為執行中。
- 嘗試關閉 Hypervisor：`bcdedit /set hypervisorlaunchtype off`。
- 結果 WSL 直接無法啟動（報錯 `HCS_E_HYPERV_NOT_INSTALLED`），因為 WSL2 必須依賴 Hyper-V。

### 2. 跨機對照實驗
為了確認是硬體還是軟體問題，我找了另一台同樣搭載 i7-12700 同樣 WSL 版本的主機測試。

- 實驗主機 WSL： `grep aes /proc/cpuinfo` 成功偵測到 `aes`。
- 結論： 這排除了 Windows Build 或 WSL 版本的通用 Bug，問題限縮在「這台特定機器」的硬體設定。

---

## 真正的根因：BIOS 中的硬體開關
最後發現，問題的核心不在 OS 層級，而在硬體抽象層的最前端：BIOS/UEFI。

在 BIOS 設定中，有一個關鍵選項：

- 路徑： `Advanced` → `CPU Configuration`
- 選項名稱： `Intel AES-NI` 或 `AES Instructions`

這個選項在問題機器上被設定為 **Disabled**。

### 為什麼 BIOS 會影響 WSL？
CPU 特性的傳遞鏈如下：

1. **CPU 硬體**：支援 AES。
2. **BIOS**：決定是否暴露該 CPUID 給作業系統。
3. **Windows**：獲取 CPUID 資訊。
4. **Hyper-V**：將指令集透傳 (Passthrough) 給 WSL。

如果第一關 BIOS 就把 AES 鎖住，後續所有的層級都會認為這顆 CPU 不支援硬體加密加速。

---

## 解決方案與驗證

### 1. 修改 BIOS
重啟進 BIOS，將 `Intel AES-NI` 更改為 **Enabled**。

### 2. 進入 WSL 驗證
再次執行檢查命令：

```bash
grep -m1 -o 'aes' /proc/cpuinfo
```
結果： `aes` 成功出現！

### 3. 最終測試
重新啟動 Google Antigravity 服務並且 Remote 到 WSL，服務恢復正常。

---

## 總結：為什麼會發生 SIGILL？
現代許多高效能程式（尤其是 Language Servers 或加密工具）在編譯時會預設 CPU 支援 AES-NI。

- **Windows 程式**：通常會先檢查 CPUID，若不支援則 Fallback 到軟體模擬（性能較慢，但不會崩潰）。
- **Linux Native Binary**：部分程式為了追求極致性能，會假設環境具備基礎指令集（如 AES），若環境不支援且程式未做 Fallback 檢查，就會直接觸發 `SIGILL` 崩潰。

**結論：**
問題的核心原因在於 BIOS 中 **Intel AES-NI** 指令集預設為關閉，導致 WSL 虛擬機無法獲取 `aes` CPU flag，進而導致現代程式（如 Google Antigravity）在執行加密相關指令時觸發非法指令 (`SIGILL`)。

**核心教訓：**
當 WSL 遇到不明原因的 `SIGILL` 時，別急著重裝 WSL Distro。先用 `lscpu` 或 `grep /proc/cpuinfo` 檢查指令集，並記得回頭看看 BIOS 設定是否正確。
