# 贪吃蛇（Greedy Snake）

纯前端经典贪吃蛇：方向键 / 屏幕 D-pad 控制，三档难度，含暂停与最近记录。

## 特性

- **纯静态**：`index.html` + `css/` + `js/`，零依赖、无构建步骤。
- **数据云端**：战绩通过 `GamePlatform` SDK 上报云端（需登录后游玩），本地不保存数据。
- **移动端适配**：针对触屏与微信 webview 优化。
- **分享卡片**：游戏内可生成 1200×1600 分享图（二维码需联网）。

## 本地运行

```sh
cd greedy-snake
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

> 分享卡片的二维码依赖 `api.qrserver.com`，必须经 `http(s)` 来源加载，请用本地服务器方式打开，不要直接 `file://` 打开。

## 文件结构

```
greedy-snake/
├── index.html
├── css/
└── js/          # 原生 JS IIFE 模块：main / snake / render / input / storage / share
```

## 部署

已部署至 Cloudflare Pages：`greedy-snake-3wq.pages.dev`
