// input.js
// 输入模块：键盘(方向键/WASD) 与 触屏滑动，统一为方向事件。
// 对外只暴露 setup()，通过回调通知方向与「开始/重开」动作。

(function (global) {
  'use strict';

  var DIR = global.SnakeCore.DIR;

  // 初始化输入。opts: { stage, onDirection(dir), onAction() }
  function setup(opts) {
    var onDirection = opts.onDirection || function () {};
    var onAction = opts.onAction || function () {};
    var stage = opts.stage || global.document.body;

    // ---------- 键盘 ----------
    global.addEventListener('keydown', function (e) {
      var handled = true;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': onDirection(DIR.UP); break;
        case 'ArrowDown': case 's': case 'S': onDirection(DIR.DOWN); break;
        case 'ArrowLeft': case 'a': case 'A': onDirection(DIR.LEFT); break;
        case 'ArrowRight': case 'd': case 'D': onDirection(DIR.RIGHT); break;
        case ' ': case 'Enter': onAction(); break;
        default: handled = false;
      }
      if (handled) e.preventDefault(); // 阻止方向键滚动页面
    });

    // ---------- 触屏滑动 ----------
    var startX = 0, startY = 0, tracking = false;
    var MIN_SWIPE = 24; // 最小滑动阈值(px)，过滤误触

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchEnd(e) {
      if (!tracking) return;
      tracking = false;
      var t = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : null;
      if (!t) return;
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      // 位移过小视为点击，忽略
      if (Math.abs(dx) < MIN_SWIPE && Math.abs(dy) < MIN_SWIPE) return;
      // 取位移较大的轴作为方向
      if (Math.abs(dx) > Math.abs(dy)) {
        onDirection(dx > 0 ? DIR.RIGHT : DIR.LEFT);
      } else {
        onDirection(dy > 0 ? DIR.DOWN : DIR.UP);
      }
      e.preventDefault(); // 阻止页面滚动
    }

    stage.addEventListener('touchstart', onTouchStart, { passive: false });
    stage.addEventListener('touchend', onTouchEnd, { passive: false });
  }

  // 对外暴露接口
  global.SnakeInput = { setup: setup };
})(window);
