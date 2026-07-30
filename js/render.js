// render.js
// Canvas 像素渲染：网格背景、蛇身、食物。
// 纯绘制，不修改游戏状态。

(function (global) {
  'use strict';

  var CELL = 20; // 每格像素数（画布 400 / 20 格）

  // 限定调色板：诺基亚绿屏复古
  var COLOR = {
    bg: '#9bbc8f',      // 背景
    grid: '#8bac0f',    // 网格线
    snakeBody: '#0f1f14', // 蛇身
    snakeHead: '#0f1f14', // 蛇头
    food: '#0f1f14',    // 食物
    eye: '#9bbc8f'      // 蛇眼
  };

  // 绘制整帧
  function draw(ctx, state) {
    // 背景填充
    ctx.fillStyle = COLOR.bg;
    ctx.fillRect(0, 0, state.cols * CELL, state.rows * CELL);

    // 网格竖线
    ctx.strokeStyle = COLOR.grid;
    ctx.lineWidth = 1;
    for (var x = 0; x <= state.cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL + 0.5, 0);
      ctx.lineTo(x * CELL + 0.5, state.rows * CELL);
      ctx.stroke();
    }
    // 网格横线
    for (var y = 0; y <= state.rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL + 0.5);
      ctx.lineTo(state.cols * CELL, y * CELL + 0.5);
      ctx.stroke();
    }

    // 食物
    if (state.food) {
      drawCell(ctx, state.food.x, state.food.y, COLOR.food);
    }

    // 蛇身：从尾到头绘制，保证蛇头在最上层
    for (var i = state.snake.length - 1; i >= 0; i--) {
      var isHead = (i === 0);
      drawCell(ctx, state.snake[i].x, state.snake[i].y, COLOR.snakeBody);
      if (isHead) drawEyes(ctx, state.snake[i].x, state.snake[i].y);
    }
  }

  // 绘制单个像素块（黑块 + 浅绿描边，形成复古方块感）
  function drawCell(ctx, gx, gy, color) {
    var px = gx * CELL;
    var py = gy * CELL;
    // 1px 浅绿描边
    ctx.fillStyle = '#8bac0f';
    ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);
    // 内部黑块
    ctx.fillStyle = color;
    ctx.fillRect(px + 3, py + 3, CELL - 6, CELL - 6);
  }

  // 蛇头双眼
  function drawEyes(ctx, gx, gy) {
    var px = gx * CELL;
    var py = gy * CELL;
    ctx.fillStyle = COLOR.eye;
    // 两个 3px 小方点
    ctx.fillRect(px + 6, py + 6, 3, 3);
    ctx.fillRect(px + 11, py + 6, 3, 3);
  }

  // 对外暴露接口
  global.SnakeRender = {
    draw: draw,
    CELL: CELL,
    COLOR: COLOR
  };
})(window);
