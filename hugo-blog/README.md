# Hugo Blog 原始碼

此目錄包含 Hugo Blog 的原始碼。

## 目錄結構

```
hugo-blog/
├── config.toml          # Hugo 設定檔
├── content/
│   └── posts/           # Markdown 文章
├── themes/
│   └── techfolio/       # 自訂主題
└── static/              # 靜態資源
```

## 使用方式

### 本地預覽

```bash
cd hugo-blog
hugo server -D
```

然後開啟 http://localhost:1313/blog/

### 新增文章

```bash
hugo new posts/my-new-post.md
```

### 建置

```bash
hugo
```

輸出會自動放到 `../blog/` 目錄。

## 自動部署

Push 到 GitHub 後，GitHub Actions 會自動建置並部署。
