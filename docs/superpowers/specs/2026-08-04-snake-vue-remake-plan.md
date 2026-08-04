# 贪吃蛇 Vue 重制版 - 实现计划

> 基于设计文档 `2026-08-04-snake-vue-remake-design.md`

## 阶段 0：清理旧项目

- [ ] 删除 greedy-snake/ 下所有现有文件和目录（保留 docs/ 和 .git/）

## 阶段 1：项目脚手架（对标 tetris 复制并适配）

- [ ] 创建 `package.json`（项目名 `vue-snake`，依赖 Vue 2.3.3 + Vuex 2.3.1，构建工具链同 tetris）
- [ ] 创建 `.babelrc`、`.editorconfig`、`.postcssrc.js`、`.gitignore`
- [ ] 创建 `config/` 目录（dev.env.js, prod.env.js, index.js）
- [ ] 创建 `build/` 目录（webpack 构建脚本，从 tetris 复制并适配路径/项目名）
- [ ] 创建 `static/` 目录 + `.gitkeep`
- [ ] 创建 `index.html`（适配贪吃蛇，引入 GamePlatform SDK）
- [ ] `npm install` 安装依赖

## 阶段 2：入口与根组件

- [ ] 创建 `src/main.js`（导入 Vue、App、store、control，调用 subscribeRecord）
- [ ] 创建 `src/App.vue` / `src/app.js`（组合所有组件，响应式缩放 render()）
- [ ] 创建 `src/app.less`（背景色 `#009688`，游戏区域居中，响应式缩放）
- [ ] 创建 `src/loader.less`（首屏加载动画）
- [ ] 创建 `src/i18n.json`（四语言：cn/en/fr/fa，贪吃蛇相关文本）

## 阶段 3：核心游戏逻辑（src/unit/）

- [ ] 创建 `src/unit/const.js`（20×20 网格、三档速度、分数规则、七种方块形状定义）
- [ ] 创建 `src/unit/snake.js`（蛇移动、碰撞检测、吃食判断、穿墙逻辑）
- [ ] 创建 `src/unit/event.js`（按键重复触发，对标 tetris 的 down/up/clearAll）
- [ ] 创建 `src/unit/index.js`（工具函数：随机食物、碰撞检测、持久化、移动端检测）
- [ ] 创建 `src/unit/music.js`（Web Audio API，单 MP3 切片播放 eat/move/death/start）

## 阶段 4：状态管理（src/vuex/）

- [ ] 创建 `src/vuex/store.js`（state 定义 + 从 localStorage 恢复 lastRecord）
- [ ] 创建 `src/vuex/mutations.js`（所有 mutation：方向、蛇身、食物、速度、分数、UI 状态）

## 阶段 5：游戏控制（src/control/）

- [ ] 创建 `src/control/index.js`（键盘映射：方向键/WASD、空格/P/R/S 键，keyDown/keyUp）
- [ ] 创建 `src/control/states.js`（状态机：start → auto → nextAround → overStart → overEnd，pause/focus）

## 阶段 6：Vue 组件（src/components/）

- [ ] 创建 `decorate/`（标题 "贪吃蛇" + 蛇形 CSS 装饰图案）
- [ ] 创建 `guide/`（PC 方向键提示 + 穿墙开关 + 难度选择 + GitHub 链接）
- [ ] 创建 `keyboard/` + `keyboard/button/`（四方向 D-pad + 暂停/音效/重置，复用 tetris 按钮组件）
- [ ] 创建 `matrix/`（Canvas 渲染 20×20 网格，JSX render，蛇身/食物绘制，消除/死亡动画）
- [ ] 创建 `music/`（音效开关 CSS sprite 图标）
- [ ] 创建 `number/`（6 位分数 + 难度等级数字显示）
- [ ] 创建 `pause/`（暂停图标，暂停时闪烁）
- [ ] 创建 `point/`（得分/最高分/上轮得分交替显示）

## 阶段 7：音效资源

- [ ] 准备 `src/assets/music.mp3` 音效文件（含 eat/move/death/start 片段）

## 阶段 8：集成测试

- [ ] `npm run dev` 开发服务器启动正常
- [ ] 键盘控制蛇移动，禁止 180° 反向
- [ ] 吃食物 → 蛇身+1、分数+10、加速
- [ ] 撞墙/撞自身 → 游戏结束
- [ ] 穿墙模式开关生效
- [ ] 三档难度切换
- [ ] 暂停/继续 + visibilitychange 自动暂停
- [ ] 音效四种正常播放 + 开关
- [ ] 移动端 D-pad 触控
- [ ] localStorage 最高分持久化
- [ ] GamePlatform 登录门控 + 分数提交
- [ ] 多语言切换
- [ ] `npm run build` 生产构建成功
- [ ] 响应式缩放各尺寸正常

## 阶段 9：文档

- [ ] 更新 `README.md`
