# 贪吃蛇（Greedy Snake）

纯前端单机经典贪吃蛇：方向键 / 屏幕 D-pad 控制，三档难度，含暂停与最近记录。

## 单机版特性

- **纯静态**：`index.html` + `css/` + `js/`，零依赖、无构建步骤。
- **无需联网**：游戏逻辑全部在浏览器本地运行。
- **数据云端**：战绩与最近记录通过 `GamePlatform` SDK 上报云端，需登录后游玩；本地不再保存任何数据。
- **即开即玩**：双击 `index.html` 即可运行；移动端已适配触屏与微信 webview。

## 本地运行

```sh
cd greedy-snake
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

或直接用浏览器打开 `index.html`。

## 文件结构

```
greedy-snake/
├── index.html
├── css/
└── js/          # 原生 JS IIFE 模块：main / snake / render / input / share
```

## 部署

可部署到 Cloudflare Pages（构建输出即静态文件）。

## 版本

当前分支：`release/1.0.0`
