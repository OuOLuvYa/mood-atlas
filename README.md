# 心情調頻所 Mood Atlas

一個給忙碌學生的互動式心情知識網站。使用者可以依狀態篩選心情卡，閱讀辨識線索，並跟著 60 秒左右的小練習稍微整理當下。

## 專案特色

- 資料驅動：新增內容只需編輯 `content/moods.js`。
- Hash 路由：每張卡都有可分享的 `#mood/<id>` 詳細頁。
- 無框架、無建置步驟，適合直接部署 GitHub Pages。
- 響應式版面、鍵盤操作、減少動態效果偏好支援。
- 完整規則寫在 `AGENTS.md`，方便 AI 延續同一套方式開發。

## 本機預覽

在此資料夾執行：

```powershell
python -m http.server 8000
```

再開啟 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 在 GitHub 建立新的 public repository。
2. 將本資料夾所有檔案推送到預設分支 `main`。
3. 進入 repository 的 **Settings → Pages**。
4. Source 選擇 **Deploy from a branch**，分支選 `main`，資料夾選 `/ (root)`。
5. 儲存後等待 GitHub 顯示公開網址。

## 新增內容

請先閱讀 [`AGENTS.md`](./AGENTS.md)，再依固定 schema 將新物件加入 `content/moods.js`。不需要複製 HTML 或修改渲染程式。

## 內容聲明

本網站提供日常自我覺察練習，不取代心理諮商、醫療診斷或緊急協助。
