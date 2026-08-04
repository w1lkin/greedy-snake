# 贪吃蛇 Vue 重制版 - 设计文档

> 日期：2026-08-04 | 状态：已确认

## 目标

删除现有纯静态贪吃蛇项目，参照 tetris（Vue 2 + Vuex + Webpack 2）架构全新开发。

## 技术栈

- Vue 2.3.3 + Vuex 2.3.1
- Webpack 2 + Babel + Less + PostCSS(autoprefixer)
- Web Audio API（单 MP3 切片音效）
- GamePlatform SDK（登录门控 + 分数提交）
- localStorage 数据持久化

## 项目结构

```
greedy-snake/
├── .babelrc
├── .editorconfig
├── .gitignore
├── .postcssrc.js
├── index.html
├── package.json
├── README.md
├── build/                    # Webpack 构建脚本（从 tetris 复制并适配）
├── config/                   # 环境配置
├── src/
│   ├── main.js               # 入口
│   ├── App.vue               # 根组件模板
│   ├── app.js                # 根组件逻辑
│   ├── app.less              # 根组件样式
│   ├── loader.less           # 首屏加载动画
│   ├── i18n.json             # 多语言：cn/en/fr/fa
│   ├── assets/
│   │   └── music.mp3         # 音效文件
│   ├── control/              # 游戏控制逻辑
│   │   ├── index.js          # 键盘事件绑定
│   │   └── states.js         # 游戏状态机
│   ├── vuex/
│   │   ├── store.js          # Vuex Store
│   │   └── mutations.js      # Mutations
│   ├── unit/                 # 核心单元
│   │   ├── const.js          # 常量（网格尺寸、速度、分数等）
│   │   ├── snake.js          # 蛇逻辑（移动、碰撞、吃食、穿墙）
│   │   ├── event.js          # 自定义事件系统（按键重复触发）
│   │   ├── index.js          # 工具函数（碰撞检测、持久化、移动端检测）
│   │   └── music.js          # Web Audio API 音效管理
│   └── components/           # Vue 组件
│       ├── decorate/         # 顶部装饰（标题 + 蛇形装饰）
│       ├── guide/            # 操作指南（方向键提示 + 穿墙开关 + 链接）
│       ├── keyboard/         # 移动端虚拟按键（D-pad）
│       │   └── button/       # 按钮子组件
│       ├── matrix/           # 游戏棋盘（Canvas 渲染 20×20 网格）
│       ├── music/            # 音效开关图标
│       ├── number/           # 数字显示（分数）
│       ├── pause/            # 暂停图标（闪烁）
│       └── point/            # 分数面板（得分/最高分/上轮得分）
├── static/                   # 静态文件（直接复制到构建输出）
└── docs/                     # 设计文档
```

## 核心游戏机制

### 网格与蛇

- **网格**：20×20（常量定义，可配置）
- **蛇移动**：四方向（上/下/左/右），每 tick 移动一格
- **方向缓冲**：单步缓冲队列，禁止 180° 反向
- **食物**：随机空格生成，吃后蛇身+1，分数+10
- **碰撞死亡**：撞自身 → 死亡；撞墙 → 取决于穿墙模式
- **穿墙模式**：可切换开关，开启后蛇从边界穿出到对面

### 难度与速度

| 难度 | 初始速度(tickInterval) | 最低速度(minTick) | 每吃食物加速(speedStep) |
|------|----------------------|------------------|----------------------|
| easy | 160ms | 110ms | 2ms |
| normal | 120ms | 60ms | 4ms |
| hard | 80ms | 40ms | 6ms |

### 状态机

```
ready → playing → gameover → ready
         ↓
       paused → playing
```

对标 tetris 的 `control/states.js`：
- `start()`：初始化蛇/食物/矩阵，触发自动下落循环
- `auto(timeout)`：setTimeout 递归驱动游戏主循环
- `nextAround()`：每 tick 执行：移动蛇 → 碰撞检测 → 吃食计分/死亡判断
- `overStart()`：游戏结束，触发动画，提交分数
- `overEnd()`：结束动画完成，重置状态
- `pause()` / `focus()`：暂停/焦点管理

## 组件设计

| 组件 | 对标 tetris | 职责 |
|------|------------|------|
| `decorate` | 标题 + 蛇形装饰图案（纯 CSS） | 顶部品牌展示 |
| `guide` | PC 方向键提示 + 穿墙开关 + 难度选择 + GitHub 链接 | 操作指引与设置 |
| `keyboard` | 四方向 D-pad + 暂停/音效/重置按钮 | 移动端触控，同时注册 touchstart/mousedown |
| `keyboard/button` | 圆形按钮子组件（多色多尺寸） | 复用 tetris 按钮组件 |
| `matrix` | Canvas 渲染 20×20 网格 | 游戏主画面，使用 Vue JSX render 函数 |
| `music` | 音效开关图标（CSS sprite） | 音效控制 |
| `number` | 数字显示（6 位分数 + 难度等级） | 分数/难度展示 |
| `pause` | 暂停图标（暂停时闪烁） | 暂停指示 |
| `point` | 得分/最高分/上轮得分交替显示 | 分数面板 |

**去掉的 tetris 组件**：`next`（无下一个方块概念）、`logo`（无龙动画需求）

## Vuex 状态设计

```js
state: {
  // 游戏核心
  snake: [],              // 蛇身坐标数组 [{x, y}, ...]
  direction: 'RIGHT',     // 当前方向
  nextDirection: 'RIGHT', // 缓冲方向
  food: { x: 0, y: 0 },   // 食物坐标
  wallPass: false,        // 穿墙模式

  // 游戏控制
  status: 'ready',        // ready | playing | paused | gameover
  difficulty: 'normal',   // easy | normal | hard
  speedStart: 120,        // 初始速度(ms)
  speedRun: 0,            // 已加速量
  startLines: 0,          // 初始蛇长

  // 分数
  score: 0,
  max: 0,
  lastScore: 0,

  // UI
  music: true,
  pause: false,
  reset: false,
  keyboard: 'game',
  lock: false,
  focus: true,
}
```

## 数据流

```
键盘/触屏 → control/index.js → store.commit(mutation)
  → state 更新
  → matrix 组件 Canvas 重绘
  → subscribeRecord → localStorage 持久化

游戏结束 → control/states.js
  → store.commit('gameover')
  → GamePlatform.submitScore({ gameId, score, difficulty })
  → store.commit('max', newMax)
```

## 音效

单 `music.mp3`，Web Audio API 切片播放：
- `eat`：吃食物
- `move`：蛇移动
- `death`：死亡
- `start`：游戏开始

## 数据持久化

- **localStorage key**：`VUE_SNAKE`
- `subscribeRecord(store)`：订阅 store 变化，编码后存入 localStorage
- 启动时从 `lastRecord` 恢复状态（最高分、音效偏好等）
- **GamePlatform SDK**：
  - 启动时 `mountGate({ gameId: 'greedy-snake' })` 登录门控
  - 游戏结束后 `submitScore({ score, difficulty })` 提交分数

## 视觉风格

对标 tetris 的 Material Design 风格：
- 背景色：`#009688`（青色）
- 现代 UI 组件样式
- CSS sprite 图标（如音效开关）
- 响应式缩放：根据屏幕宽高比动态 scale 游戏区域
- 首屏 loader 动画

## 移动端适配

完全对标 tetris：
- 响应式缩放（`render()` 中根据宽高比计算 scale）
- 屏幕 D-pad 虚拟按键（桌面端隐藏）
- touchstart + preventDefault 防滚动
- visibilitychange 页面切后台自动暂停

## 多语言

`src/i18n.json`，支持四种语言：
- `cn`：中文
- `en`：英文
- `fr`：法文
- `fa`：波斯文

自动检测浏览器语言，支持 URL 参数 `?lan=` 覆盖。

## 非目标

- 不包含分享卡片功能（share-card.html）
- 不包含联机/排行榜后端
- 不包含微信小游戏 SDK
- 不保留旧版 IIFE 模块代码

## 验收清单

1. `npm run dev` 启动开发服务器，浏览器正常显示游戏
2. 键盘方向键控制蛇移动，禁止 180° 反向
3. 吃食物蛇身+1、分数+10、速度逐渐加快
4. 撞墙（无穿墙模式）或撞自身 → 游戏结束
5. 穿墙模式开关生效（蛇从边界穿出）
6. 三档难度切换正常，速度差异明显
7. 暂停/继续功能正常，页面切后台自动暂停
8. 音效开关正常，四种音效播放正确
9. 移动端 D-pad 触控正常
10. 刷新页面后最高分保留
11. GamePlatform 登录门控 + 分数提交正常
12. 多语言切换正常（URL 参数 / 浏览器语言）
13. `npm run build` 生产构建成功
14. 响应式缩放在不同屏幕尺寸下正常显示
