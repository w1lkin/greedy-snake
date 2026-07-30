// input.js
// 输入模块：键盘(方向键/WASD) 与 屏幕方向键，统一为方向事件。
// 对外只暴露 setup()，通过回调通知方向与「开始/重开」动作。

(function (global) {
  'use strict';

  var DIR = global.SnakeCore.DIR;

  // 初始化输入。opts: { stage, onDirection(dir), onAction() }
  function setup(opts) {
    var onDirection = opts.onDirection || function () {};
    var onAction = opts.onAction || function () {};

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

    // ---------- 屏幕方向键 ----------
    // 点击 / 触摸方向键 -> 发送对应方向；阻止双击缩放与默认滚动
    function bindPad(el, dir) {
      if (!el) return;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        onDirection(dir);
      });
      el.addEventListener('touchstart', function (e) {
        e.preventDefault(); // 不触发滑动，直接响应按键
        onDirection(dir);
      }, { passive: false });
    }

    bindPad(global.document.getElementById('pad-up'), DIR.UP);
    bindPad(global.document.getElementById('pad-down'), DIR.DOWN);
    bindPad(global.document.getElementById('pad-left'), DIR.LEFT);
    bindPad(global.document.getElementById('pad-right'), DIR.RIGHT);
  }

  // 对外暴露接口
  global.SnakeInput = { setup: setup };
})(window);
