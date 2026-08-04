# 贪吃蛇 (Snake)

使用 Vue 2 + Vuex 构建的经典贪吃蛇游戏，支持穿墙模式和多种难度。

## 技术栈

- Vue 2.3.3 + Vuex 2.3.1
- Webpack 2 + Babel + Less
- Web Audio API 音效
- GamePlatform SDK（登录门控 + 分数提交）
- localStorage 数据持久化
- 四语言支持（中/英/法/波斯语）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

## 游戏操作

- **键盘**：方向键 / WASD 控制方向，空格/P 暂停/开始，R 重置，S 音效开关
- **触屏**：屏幕下方虚拟按键
- **穿墙模式**：PC 端左侧设置面板可切换
- **难度**：简单/普通/困难三档

## 部署

部署于 Cloudflare Pages：`greedy-snake-3wq.pages.dev`
