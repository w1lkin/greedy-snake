// snake.js
// 贪吃蛇核心逻辑：蛇体、食物、移动、碰撞、加速。
// 与渲染、输入解耦，仅维护纯数据状态，便于独立测试。

(function (global) {
  'use strict';

  var COLS = 20;            // 逻辑列数
  var ROWS = 20;            // 逻辑行数
  var INIT_LEN = 3;         // 初始长度
  var SCORE_PER_FOOD = 10;  // 每个食物得分

  // 四个方向常量
  var DIR = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
  };

  // 创建初始游戏状态
  function createState() {
    var snake = [];
    var cy = Math.floor(ROWS / 2);   // 垂直居中
    var cx = Math.floor(COLS / 2);   // 水平居中
    // 蛇身从中心向左排布，头在最右侧
    for (var i = 0; i < INIT_LEN; i++) {
      snake.push({ x: cx - i, y: cy });
    }
    var state = {
      cols: COLS,
      rows: ROWS,
      snake: snake,
      dir: DIR.RIGHT,
      nextDir: DIR.RIGHT,
      food: null,
      score: 0,
      alive: true,
      tickInterval: 120,  // 步进间隔(ms)
      minTick: 60,        // 最快间隔(ms)下限，防止过快
      speedStep: 4        // 每吃一个食物缩短的间隔(ms)
    };
    state.food = spawnFood(state);
    return state;
  }

  // 校验方向是否允许（禁止 180° 反向，避免瞬间自杀）
  function canTurn(state, dir) {
    if (dir.x === -state.dir.x && dir.y === -state.dir.y) return false;
    return true;
  }

  // 设置下一次方向（在 step 前生效，避免一帧内多次误转向）
  function setDirection(state, dir) {
    if (canTurn(state, dir)) {
      state.nextDir = dir;
    }
  }

  // 在空格随机生成食物，返回 {x,y}；棋盘填满时返回 null
  function spawnFood(state) {
    var occupied = {};
    for (var i = 0; i < state.snake.length; i++) {
      occupied[state.snake[i].x + ',' + state.snake[i].y] = true;
    }
    var empty = [];
    for (var x = 0; x < state.cols; x++) {
      for (var y = 0; y < state.rows; y++) {
        if (!occupied[x + ',' + y]) empty.push({ x: x, y: y });
      }
    }
    if (empty.length === 0) return null;
    return empty[Math.floor(Math.random() * empty.length)];
  }

  // 前进一步；返回事件：'eat' | 'dead' | 'move'
  function step(state) {
    if (!state.alive) return 'dead';

    // 应用缓冲的方向
    state.dir = state.nextDir;

    var head = state.snake[0];
    var nx = head.x + state.dir.x;
    var ny = head.y + state.dir.y;

    // 撞墙检测（越界）
    if (nx < 0 || ny < 0 || nx >= state.cols || ny >= state.rows) {
      state.alive = false;
      return 'dead';
    }

    // 撞自身检测（尾格本步会让位，不计入碰撞）
    for (var i = 0; i < state.snake.length - 1; i++) {
      if (state.snake[i].x === nx && state.snake[i].y === ny) {
        state.alive = false;
        return 'dead';
      }
    }

    // 新头入队（放在数组头部）
    state.snake.unshift({ x: nx, y: ny });

    // 吃到食物
    if (state.food && nx === state.food.x && ny === state.food.y) {
      state.score += SCORE_PER_FOOD;
      // 加速：缩短间隔但不低于下限
      if (state.tickInterval > state.minTick) {
        state.tickInterval -= state.speedStep;
      }
      state.food = spawnFood(state);
      return 'eat';
    }

    // 未吃到：移除尾格保持长度
    state.snake.pop();
    return 'move';
  }

  // 对外暴露接口
  global.SnakeCore = {
    DIR: DIR,
    createState: createState,
    setDirection: setDirection,
    step: step,
    COLS: COLS,
    ROWS: ROWS
  };
})(window);
