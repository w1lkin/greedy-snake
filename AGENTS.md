# 贪吃蛇

## 项目概览

经典贪吃蛇游戏，支持穿墙模式和三种难度，PC/移动均适配。

- **形态**：Vue 2.3.3 + Vuex 2.3.1 + Webpack 2 + Babel + Less，仓库中**唯一需要构建的 Web 游戏**之一
- **音频**：Web Audio API（毫秒级精确、高频播放音效）
- **i18n**：四语言支持（中/英/法/波斯语），见 `src/i18n.json`
- **数据本地**：状态通过 Vuex `store.subscribe` 持久化到 `localStorage`
- **账号**：通过 `GamePlatform` SDK 实现登录门控与分数提交
- **部署域名**：`https://greedy-snake-3wq.pages.dev/`

## 本地运行

```sh
cd greedy-snake
npm install
npm run dev        # 启动开发服务器
```

## 构建

```sh
npm run build      # 输出到 dist/
```

## 操作

- **键盘**：方向键 / WASD 控制方向；空格 / P 暂停/开始；R 重置；S 音效开关
- **触屏**：屏幕下方虚拟按键
- **穿墙模式**：PC 端左侧设置面板可切换
- **难度**：简单 / 普通 / 困难三档

## 文件结构（核心模块）

```
greedy-snake/
├── index.html               # 页面入口
├── package.json             # Vue 2 + Vuex + Webpack 2
├── build/                   # Webpack 构建脚本
├── config/                  # 环境配置
└── src/
    ├── main.js              # 入口
    ├── App.vue              # 根组件
    ├── components/          # 10 个组件子目录（每个含 .vue + .js + .less）
    │   ├── decorate/  guide/  keyboard/  logo/  matrix/
    │   ├── music/     next/    number/    pause/ point/
    │   └── keyboard/button/
    ├── control/             # 游戏控制（状态机 + 操作指令）
    ├── vuex/                # Vuex store（store.js + mutations.js）
    ├── unit/                # 工具模块（const.js, event.js, music.js, snake.js）
    └── i18n.json            # 多语言配置
```

## 约定

- 组件目录命名：功能名单数（如 `decorate`、`music`），目录下三个文件同名不同后缀
- 操作指令集中在 `src/control/`，不在组件内修改全局状态
- 业务逻辑与渲染严格分离
- 共享可变状态走 `state` 对象，避免散落全局变量
