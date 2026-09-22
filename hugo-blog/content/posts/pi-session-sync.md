---
title: "Pi Agent 對話同步方式"
date: 2026-09-22
draft: false
description: "記錄我如何用 Google Drive、rclone 與 pi-cloud，在家用電腦、公司電腦及 Codespaces 之間延續 Pi 對話，以及 session 路徑、同步衝突和 OAuth 授權過期的排查經驗。"
tags: ["Pi", "AI Agent", "rclone", "Google Drive", "Codespaces"]
categories: ["技術"]
---

在家裡用 Pi Agent 開發到一半，隔天到公司把專案 `git pull` 下來，程式碼接上了，昨天和 AI 討論的內容卻沒有跟過來。

如果只是問過幾個問題，重新說明還不算麻煩。但當對話裡已經累積需求、設計取捨、排查過程與下一步工作，每換一台電腦就從頭交代，會讓開發節奏一直中斷。

我的需求很直接：在家裡、公司，甚至用手機開啟 GitHub Codespaces 時，都能繼續同一個專案的 Pi 對話。我沒有 NAS，也希望盡量利用既有的免費工具完成。

這篇記錄我從 Dropbox 改用 Google Drive＋rclone，再把操作整理成 `pi-cloud` 的過程。家裡與公司的同步已經實測成功，但後續仍遇到 OAuth 授權過期。這部分會保留當時的問題狀態，不把尚未確認的解法寫成成功案例。

> 本文指令是依照這套流程重新整理的 Bash 操作範例，適用於 Linux、WSL 與 Codespaces。它們不是當時完整 `pi-cloud` 腳本的逐字備份；操作前請確認本機 `pi --help` 與 rclone 設定。

## 一、先弄清楚：程式碼、對話與登入資訊放在哪裡？

一開始，我以為 Pi 的聊天紀錄可能和專案設定一起放在 `.pi/settings.json`，只要同步 repo 就能帶走。

實際上，設定檔和 session 是不同的東西。[Pi 官方文件](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/README.md#sessions)說明，session 預設存放在使用者家目錄下，並依工作目錄分類；對話檔案採用 JSONL 格式。

我當時在 Codespaces 看到的目錄是：

```text
~/.pi/agent/sessions/--workspaces-FPV-Drone-Trainer--/
```

裡面才是以時間與識別碼命名的 `.jsonl` 檔案。

把幾種資料分開看，整個問題就清楚多了：

| 資料 | 用途 | 我的處理方式 |
| --- | --- | --- |
| 專案原始碼 | 網頁、程式與專案文件 | 使用 Git／GitHub 同步 |
| `.pi/settings.json` | 專案層級的 Pi 設定 | 視內容納入版本控制 |
| `~/.pi/agent/settings.json` | 使用者層級設定，例如套件與偏好 | 透過 dotfiles 管理適合共用的部分 |
| Session `.jsonl` | 對話與工具執行紀錄 | 使用 Google Drive＋rclone 傳輸 |
| Pi 的 `auth.json`、rclone 授權設定 | 登入憑證與 token | 在各環境個別設定，不放進公開 repo 或 session 同步目錄 |

因此，`git pull` 完成並不代表 Pi 對話也完成同步。另一方面，即使 session 已經下載成功，新環境仍可能需要登入模型服務。

## 二、為什麼最後選 Google Drive＋rclone？

我最早考慮用 Dropbox 同步 session，後來發現公司網路封鎖 Dropbox。這代表方案即使在家能用，到了真正需要接續工作的地方還是會卡住。

後來改用 Google Drive，並透過 rclone 從終端機上傳、下載檔案。這樣可以在 WSL、Linux 與 Codespaces 使用相同的操作方式，不必仰賴桌面版同步程式。

我把資料分成兩條路：

- **GitHub 保存程式碼**：切換電腦時同步 commit。
- **Google Drive 保存對話檔案**：進入 Pi 前下載，結束 Pi 後上傳。

Pi 執行時仍讀寫本機檔案，不直接把雲端掛載目錄當成工作中的 session 目錄。我的目標是明確掌握「什麼時候下載、什麼時候上傳」，方便判斷同步在哪一步失敗。

Google Drive 使用 `AI-Agent-Sessions` 作為整理入口。以 FPV 專案為例，對應關係如下：

| 位置 | 路徑範例 |
| --- | --- |
| 本機 session 目錄 | `~/.pi-sync/FPV-Drone-Trainer/` |
| Google Drive 的 Pi 對話 | `AI-Agent-Sessions/FPV-Drone-Trainer/pi/` |
| Google Drive 的其他 Agent 對話 | `AI-Agent-Sessions/FPV-Drone-Trainer/codex/` |

`pi/` 和 `codex/` 分開只是為了分類；這不代表兩個工具的對話格式可以直接互用。

## 三、第一個踩坑：設定改了，session 還是寫到原本的位置

早期測試時，我預期新對話會出現在 `~/.pi-sync/FPV-Trainer/`，結果找不到。實際檔案仍出現在 Pi 預設的 sessions 目錄。

這個現象很容易被誤判成「雲端沒有同步」，但當下更前面的問題是：**Pi 根本沒有把新檔案寫進準備同步的資料夾。**

後來改用明確的啟動參數：

```bash
pi --session-dir "$HOME/.pi-sync/FPV-Drone-Trainer"
```

Pi 官方 CLI 文件列有 `--session-dir`，可指定 session 儲存目錄。要選擇既有對話，則搭配 `--resume`：

```bash
pi --session-dir "$HOME/.pi-sync/FPV-Drone-Trainer" --resume
```

這個參數只負責指定位置，不會把其他目錄的舊對話自動搬過來。第一次導入時，仍要在 Pi 關閉的狀態下備份並複製想保留的舊 `.jsonl` 檔案；同名檔案應先比對，不要直接覆蓋。

另一個小細節是命名。`FPV-Trainer` 和 `FPV-Drone-Trainer` 對人來說很像，對腳本卻是不同目錄。跨機同步需要的是每台機器都使用相同的專案識別名稱。

## 四、先把手動流程跑通，再包裝成指令

下面用一個專案示範完整交接。前提是 Pi 與 rclone 已安裝、模型服務已登入，而且沒有另一台機器正在修改同一份 session。

### 1. 確認 Google Drive remote

如果尚未建立 remote，執行：

```bash
rclone config
```

依照 [rclone Google Drive 文件](https://rclone.org/drive/)建立 Google Drive 連線並完成授權。以下假設 remote 名稱是 `gdrive`，且它的根目錄是 Google Drive 的「我的雲端硬碟」。這是本文範例名稱，請換成自己的設定。

```bash
rclone listremotes
rclone lsd gdrive:
```

若 remote 已經透過 `root_folder_id` 指向 `AI-Agent-Sessions`，後面的遠端路徑就不要再重複加上這層資料夾。

Google Drive OAuth 的設定方式可能隨版本調整；建立新連線時應以官方文件為準，不要只照舊教學的選單編號操作。

### 2. 設定這次要使用的專案路徑

先進入本機的專案 repo，再於同一個 Bash 終端機設定：

```bash
project_id="FPV-Drone-Trainer"
local_sessions="$HOME/.pi-sync/$project_id"
remote_sessions="gdrive:AI-Agent-Sessions/$project_id/pi"

mkdir -p "$local_sessions"
```

首次建立這個專案的雲端資料夾時，可執行：

```bash
rclone mkdir "$remote_sessions"
```

### 3. 開工前，先下載 session

這一步適用於「上一台已成功上傳，這台沒有尚未上傳的新對話」的交接情境。若這台上次上傳失敗，先看後面的故障處理，不要直接下載覆蓋。

```bash
rclone copy "$remote_sessions" "$local_sessions" \
  --include '*.jsonl' --progress
```

確認下載成功後，再從專案 repo 中啟動：

```bash
pi --session-dir "$local_sessions" --resume
```

第一次還沒有任何對話時，省略 `--resume` 建立新 session 即可。

本文只傳輸 session 目錄下的 JSONL 檔案。若使用的擴充套件另有附件或外部狀態，必須另外確認保存方式；它們不會因為這條指令而自動完整搬移。

### 4. 收工後，關閉 Pi 再上傳

等 Pi 結束、session 不再寫入後，執行：

```bash
rclone copy "$local_sessions" "$remote_sessions" \
  --include '*.jsonl' --progress
```

確認上傳成功，才到另一台機器接手。程式碼也要另外完成 commit／push，讓下一台拿到和對話進度相符的專案內容。

### 5. 做一次真正的跨機驗證

我在家裡與公司之間做過同步測試，確認這個方向可行。要重現驗證，不需要先跑很大的開發任務：

1. 在 A 電腦建立一段容易辨識的測試對話。
2. 關閉 Pi，確認上傳成功。
3. 在 B 電腦下載，使用 `--resume` 開啟該對話。
4. 確認能看到 A 的訊息，再補上一段 B 的測試內容。
5. 關閉、上傳，最後回到 A 下載確認。

這樣才能同時驗證寫入位置、遠端路徑、讀取方式與回程上傳。

## 五、為什麼使用 copy，還是可能弄丟進度？

根據 [rclone copy 文件](https://rclone.org/commands/rclone_copy/)，`copy` 不會刪除目的端多出來的檔案。這讓它適合用來建立容易理解的上傳／下載流程。

但有一個界線要記住：**不刪除額外檔案，不代表不覆蓋同名檔案。**

如果家裡和公司同時延續同一個 session，兩邊都會修改同名 JSONL。一般的檔案複製不會理解對話分支，也不會自動合併兩台機器各自新增的內容。

因此，我把這套流程限制在「輪流使用、一台接一台」的情境：

| 情境 | 處理方式 |
| --- | --- |
| A 已正常收工並成功上傳 | B 才下載並繼續 |
| A 還開著同一個 session | B 先不要接續修改 |
| A 上傳失敗 | 保留 A 的本機檔案，排除問題後重試 |
| A、B 已經各自增加內容 | 先分別備份，再人工確認需要保留的對話 |

也不要直接在 Bash 裡把兩份 JSONL 串接起來當作「合併」。Pi 的 session 有自己的結構，單純接在一起不等於有效的對話整合。

`copy` 的另一個結果是刪除不會傳播：本機刪掉的舊 session 可能在下次下載時又回來。需要清理歷史紀錄時，應確認兩端內容並另行處理。

## 六、從單一專案走向全域 pi-cloud

當 FPV 專案跑通後，我希望其他 repo 也能沿用相同操作，不要每建立一個專案就重寫同步指令。

因此，後來的方向是把共用腳本放進 `dotfiles`，透過 `~/dotfiles/install.sh` 安裝，並用全域 `pi-cloud` 作為入口。

`pi-cloud` 是我為這套工作流程使用的包裝指令名稱，不是 Pi 內建的雲端服務。它要串起的核心步驟就是：辨識專案、決定 session 路徑、下載、啟動 Pi，最後上傳。

要讓它真正能跨專案使用，我會特別檢查這幾件事：

- **專案識別要穩定。** 不同電腦 clone 到不同路徑，仍應指向相同雲端資料夾；若不同 repo 同名，也要能區分。
- **下載失敗要明確停止。** 不應悄悄拿舊對話繼續，再於結束時蓋回雲端。
- **上傳失敗要留住檔案。** 顯示本機位置與重試方式，不能把失敗當成同步完成。
- **換機交接要有規則。** 包成一條指令後，仍然不會自動解決跨機同時寫入。

我也遇過明明 repo 裡有 `.git`，`pi-cloud` 卻說「必須在 Git repository 內執行」。這種錯誤應先檢查執行位置和腳本的判斷，不應直接歸因於 repo 是 private。

可以先在同一個終端機檢查：

```bash
pwd
git rev-parse --is-inside-work-tree
git rev-parse --show-toplevel
```

腳本若只用「目前目錄底下是否有 `.git` 資料夾」來判斷，會漏掉從子目錄啟動或使用 Git worktree 等情境。這是排查方向，不代表當時已確認唯一根因。

## 七、手機接續開發：讓 Codespaces 執行 Pi

手機端的做法，是用手機開啟 Codespaces，再於遠端開發環境的終端機執行 Pi 與 rclone。手機主要負責操作介面。

Codespaces 一樣需要準備三件事：專案程式碼、Pi 執行環境與登入，以及 session 的下載／上傳。程式碼從 GitHub 取得，對話從 Google Drive 取得，環境設定則盡量用 dotfiles 重建。

如果 Codespaces 裡無法直接完成 rclone 的瀏覽器授權，可以依照 [rclone Remote Setup 文件](https://rclone.org/remote_setup/)走遠端授權流程。

我曾遇到重新開啟 Codespaces 後，執行 Pi 又被要求登入。這件事不能單憑現象就判定 session 同步失敗：對話檔案是否存在，與模型服務的憑證是否仍可用，是兩個檢查項目。

另外，恢復 session 不會自動重建 Node、擴充套件或原機器上的所有路徑。能讀到舊對話，只表示對話檔案可用；若工具或套件無法啟動，還要檢查當前環境。

## 八、後來卡住的問題：Google OAuth 授權過期

跨機同步成功後，我在後續使用時遇到這類錯誤：

```text
oauth2: invalid_grant
```

錯誤訊息也提示可以使用 `rclone config reconnect` 重新連線。這時要先區分：失敗的是 Google Drive 存取授權，不代表本機 session 檔案已經損毀。

### Testing 模式的七天限制

[Google OAuth 官方文件](https://developers.google.com/identity/protocols/oauth2#expiration)說明：外部使用者類型的應用程式若處於 `Testing` 狀態，所發出的 refresh token 通常會在七天後到期；僅要求基本身分資訊的 scopes 有例外。Google Drive 檔案存取不屬於那組例外。

這是當時需要優先核對的設定。不過，`invalid_grant` 本身不只可能由這個原因引起，撤銷授權等情況也可能讓 refresh token 失效。

### 暫時恢復連線

以本文的 remote 名稱為例：

```bash
rclone config reconnect gdrive:
```

完成互動授權後，再確認可以讀取：

```bash
rclone lsd gdrive:
```

若剛才失敗的是上傳，要先備份尚未上傳的本機 session，確認另一台沒有繼續寫入，再重試上傳。不要恢復連線後就直接執行「開工下載」，把雲端較舊的版本覆蓋回來。

### 為什麼不能當作每七天跑一次排程就解決？

我當時也想過，能不能每七天自動跑腳本重新登入。

但正常使用 refresh token 換取 access token，與失效後重新取得使用者授權，是不同流程。定時執行 `reconnect` 不等於能無人值守完成登入與同意畫面，也沒有移除 Testing 模式本身的期限。

我接著嘗試處理正式發布設定，卻遇到「網域無效」，所以當時並未完成這一步。這篇只記錄到已確認的進度；不能把「改成 In production」寫成我已成功套用的最終解法，也不能保證正式發布後 token 永遠不會失效。

## 九、這次建立下來的工作習慣

這次最有幫助的改變，是把原本混在一起的狀態拆開檢查：程式碼有沒有推上去？session 寫在哪裡？雲端有沒有收到？新環境是否登入？工具是否安裝完成？

現在切換設備時，我會先結束目前的 Pi 對話，確認程式碼和 session 都已完成上傳，再讓下一台下載接手。遇到錯誤，就沿著「本機檔案 → 傳輸 → 授權 → 恢復對話」逐步確認。

Google Drive＋rclone 已經讓我在家裡和公司延續同一段 Pi 工作，但這套流程仍需要清楚的交接順序。下一個要補齊的部分，是 OAuth 的長期授權設定，以及 `pi-cloud` 在同步失敗時更可靠的提示與恢復流程。

## 參考資料

- [Pi 官方 README：Sessions 與 CLI Reference](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/README.md)
- [Pi Sessions：儲存格式與對話管理](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/docs/sessions.md)
- [rclone：Google Drive 設定](https://rclone.org/drive/)
- [rclone：copy 指令](https://rclone.org/commands/rclone_copy/)
- [rclone：config reconnect 指令](https://rclone.org/commands/rclone_config_reconnect/)
- [rclone：Remote Setup](https://rclone.org/remote_setup/)
- [Google：OAuth 2.0 refresh token 到期條件](https://developers.google.com/identity/protocols/oauth2#expiration)