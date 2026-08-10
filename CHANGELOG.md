# CHANGELOG

## [2.0.0] - 2026-08-10

### Docs
- 新建 `AGENTS.md`（项目架构与 AI 协作指南）
- 更新 `README.md`，统一格式

---

## [1.0.0] - 2026-07

### Added
- 贪吃蛇初始版本：经典贪吃蛇，支持穿墙模式和三档难度
- Vue 2 + Vuex + Webpack 架构
- Web Audio API 音效
- 四语言支持（中/英/法/波斯语）
- localStorage 数据持久化
- PC 键盘 + 移动端触屏双模式操作

### Changed
- 战绩存储从 localStorage 迁移到 GamePlatform 云端
- 接入 GamePlatform 登录门（`mountGate`）
- 移除顶部用户栏与天梯榜浮层
- 底部 tab "首页"→"主页"，"门户"→"游戏"
- 域名改回 Cloudflare Pages 默认域名 `greedy-snake-3wq.pages.dev`
- 部署至 Cloudflare Pages
