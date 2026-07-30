// render.js
// Canvas 像素渲染：网格背景、蛇身、食物。
// 纯绘制，不修改游戏状态。

(function (global) {
  'use strict';

  var CELL = 20; // 每格像素数（画布 400 / 20 格）

  // 限定调色板：复古橄榄绿 + 黑色像素方块（与参考图一致）
  var COLOR = {
    bg: '#9aaf7a',      // 橄榄灰绿背景
    grid: '#8a9a68',    // 淡网格线/方块间隙
    snakeBody: '#0f1f14', // 蛇身
    snakeHead: '#0f1f14', // 蛇头
    food: '#0f1f14',    // 食物
    eye: '#9aaf7a'      // 蛇眼（背景色）
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
      if (isHead) drawEyes(ctx, state.snake[i].x, state.snake[i].y, state.dir);
    }
  }

  // 绘制单个像素块（黑色方块 + 细浅绿间隙，与参考图一致）
  function drawCell(ctx, gx, gy, color) {
    var px = gx * CELL;
    var py = gy * CELL;
    // 浅绿间隙/描边
    ctx.fillStyle = COLOR.grid;
    ctx.fillRect(px + 1, py + 1, CELL - 2, CELL - 2);
    // 内部黑色方块（几乎填满格子）
    ctx.fillStyle = color;
    ctx.fillRect(px + 2, py + 2, CELL - 4, CELL - 4);
  }

  // 蛇头双眼：位于前进方向一侧
  function drawEyes(ctx, gx, gy, dir) {
    var px = gx * CELL;
    var py = gy * CELL;
    ctx.fillStyle = COLOR.eye;
    if (dir.x === 1) { // 朝右
      ctx.fillRect(px + 14, py + 5, 2, 2);
      ctx.fillRect(px + 14, py + 11, 2, 2);
    } else if (dir.x === -1) { // 朝左
      ctx.fillRect(px + 3, py + 5, 2, 2);
      ctx.fillRect(px + 3, py + 11, 2, 2);
    } else if (dir.y === -1) { // 朝上
      ctx.fillRect(px + 5, py + 3, 2, 2);
      ctx.fillRect(px + 11, py + 3, 2, 2);
    } else { // 朝下
      ctx.fillRect(px + 5, py + 14, 2, 2);
      ctx.fillRect(px + 11, py + 14, 2, 2);
    }
  }

  // 对外暴露接口
  global.SnakeRender = {
    draw: draw,
    CELL: CELL,
    COLOR: COLOR
  };
})(window);
