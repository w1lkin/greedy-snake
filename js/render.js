// render.js
// Canvas 像素渲染：网格背景、蛇身、食物。
// 纯绘制，不修改游戏状态。
// 注意：canvas 内部分辨率由 main.js 按 DPR 与显示尺寸动态设定（格子数的整数倍），
// 因此本文件的 CELL 在绘制时按实际画布计算，保证整数像素对齐、缩放不丢格子。

(function (global) {
  'use strict';

  // 限定调色板：复古橄榄绿 + 黑色像素方块（与参考图一致）
  var COLOR = {
    bg: '#9aaf7a',      // 橄榄灰绿背景
    grid: '#7c8c5b',    // 网格线/方块间隙（比背景略深，确保格子清晰可见）
    snakeBody: '#0f1f14', // 蛇身
    snakeHead: '#0f1f14', // 蛇头
    food: '#0f1f14',    // 食物
    eye: '#9aaf7a'      // 蛇眼（背景色）
  };

  // 绘制整帧
  function draw(ctx, state) {
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    // 每格像素（整数，由 main.js 保证 canvas 尺寸为 cols 的整数倍）
    var cell = Math.round(cw / state.cols);

    // 背景填充
    ctx.fillStyle = COLOR.bg;
    ctx.fillRect(0, 0, cw, ch);

    // 网格线：用 fillRect 画整数对齐的实线，避免半像素抗锯齿模糊/丢失
    ctx.fillStyle = COLOR.grid;
    var gw = Math.max(1, Math.round(cell * 0.08)); // 线宽随格子缩放，至少 1px
    var i, px, py;
    for (i = 0; i <= state.cols; i++) {
      px = Math.round(i * cell);
      ctx.fillRect(px, 0, gw, ch);
    }
    for (i = 0; i <= state.rows; i++) {
      py = Math.round(i * cell);
      ctx.fillRect(0, py, cw, gw);
    }

    // 食物
    if (state.food) {
      drawCell(ctx, state.food.x, state.food.y, COLOR.food, cell);
    }

    // 蛇身：从尾到头绘制，保证蛇头在最上层
    for (var s = state.snake.length - 1; s >= 0; s--) {
      var isHead = (s === 0);
      drawCell(ctx, state.snake[s].x, state.snake[s].y, COLOR.snakeBody, cell);
      if (isHead) drawEyes(ctx, state.snake[s].x, state.snake[s].y, state.dir, cell);
    }
  }

  // 绘制单个像素块（黑色方块 + 细浅绿间隙，与参考图一致）
  function drawCell(ctx, gx, gy, color, cell) {
    var px = gx * cell;
    var py = gy * cell;
    var gap = Math.max(1, Math.round(cell * 0.08)); // 间隙随格子缩放，至少 1px
    // 浅绿间隙/描边
    ctx.fillStyle = COLOR.grid;
    ctx.fillRect(px, py, cell, cell);
    // 内部黑色方块（留出间隙）
    ctx.fillStyle = color;
    ctx.fillRect(px + gap, py + gap, cell - 2 * gap, cell - 2 * gap);
  }

  // 蛇头双眼：位于前进方向一侧（按格子比例绘制，整数对齐）
  function drawEyes(ctx, gx, gy, dir, cell) {
    var px = gx * cell;
    var py = gy * cell;
    var e = Math.max(1, Math.round(cell * 0.12));   // 眼睛边长
    var off = Math.round(cell * 0.22);              // 距边距离
    var far = cell - off - e;                       // 远端坐标
    ctx.fillStyle = COLOR.eye;
    if (dir.x === 1) { // 朝右
      ctx.fillRect(far, off, e, e);
      ctx.fillRect(far, far, e, e);
    } else if (dir.x === -1) { // 朝左
      ctx.fillRect(off, off, e, e);
      ctx.fillRect(off, far, e, e);
    } else if (dir.y === -1) { // 朝上
      ctx.fillRect(off, off, e, e);
      ctx.fillRect(far, off, e, e);
    } else { // 朝下
      ctx.fillRect(off, far, e, e);
      ctx.fillRect(far, far, e, e);
    }
  }

  // 对外暴露接口
  global.SnakeRender = {
    draw: draw,
    COLOR: COLOR
  };
})(window);
