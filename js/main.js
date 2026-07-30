// main.js
// 入口：状态机(ready/playing/gameover)、游戏主循环、UI 串联。
// 依赖：SnakeStorage, SnakeCore, SnakeRender, SnakeInput, SnakeShare

(function () {
  'use strict';

  // ---------- DOM 引用 ----------
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');
  var stage = canvas.parentElement; // .stage
  var COLS = SnakeCore.COLS;
  var ROWS = SnakeCore.ROWS;

  // 让 canvas 内部分辨率匹配显示尺寸 × DPR，且为格子数的整数倍。
  // 这样 CSS 缩放比例为整数，最近邻缩放不会丢格子/网格线。
  function fitCanvas() {
    var dpr = window.devicePixelRatio || 1;
    var cssW = stage.clientWidth || 400;          // 显示宽度（CSS 像素）
    var target = Math.round(cssW * dpr);          // 目标物理像素
    var cell = Math.max(2, Math.round(target / COLS)); // 每格物理像素（整数）
    canvas.width = cell * COLS;
    canvas.height = cell * ROWS;
  }

  var scoreEl = document.getElementById('score');
  var bestEl = document.getElementById('best');
  var overlayReady = document.getElementById('overlay-ready');
  var overlayOver = document.getElementById('overlay-over');
  var recordsList = document.getElementById('records-list');
  var finalScoreEl = document.getElementById('final-score');
  var finalBestEl = document.getElementById('final-best');
  var btnStart = document.getElementById('btn-start');
  var btnRestart = document.getElementById('btn-restart');
  var btnShare = document.getElementById('btn-share');
  var btnPause = document.getElementById('btn-pause');
  var btnResume = document.getElementById('btn-resume');
  var overlayPause = document.getElementById('overlay-pause');
  var shareArea = document.getElementById('share-area');
  var diffGroup = document.getElementById('diff-group');

  // ---------- 运行时状态 ----------
  var state = null;        // 当前游戏状态（SnakeCore.createState 产出）
  var running = false;     // 主循环是否运行
  var lastTick = 0;        // 上次步进时间戳
  var rafId = null;        // requestAnimationFrame 句柄
  var pausedByHidden = false; // 是否因页面切后台而暂停
  var paused = false;      // 是否手动暂停（遮罩）
  var currentDifficulty = 'normal'; // 当前难度

  // 渲染「最近记录」列表（ready 与 over 页共用）
  function renderRecords() {
    var records = SnakeStorage.getRecords();
    bestEl.textContent = SnakeStorage.getBest();
    recordsList.innerHTML = '';
    if (records.length === 0) {
      var empty = document.createElement('li');
      empty.textContent = '暂无记录';
      recordsList.appendChild(empty);
      return;
    }
    records.forEach(function (r) {
      var li = document.createElement('li');
      var d = new Date(r.date);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var dd = ('0' + d.getDate()).slice(-2);
      li.textContent = r.score + ' 分 · ' + mm + '-' + dd;
      recordsList.appendChild(li);
    });
  }

  // 进入 ready 状态：展示开始页与历史记录
  function toReady() {
    running = false;
    paused = false;
    overlayReady.classList.remove('hidden');
    overlayOver.classList.add('hidden');
    overlayPause.classList.add('hidden');
    btnPause.hidden = true;
    state = SnakeCore.createState(currentDifficulty);
    SnakeRender.draw(ctx, state);
    renderRecords();
    scoreEl.textContent = '0';
  }

  // 开始 / 重新开始游戏
  function startGame() {
    state = SnakeCore.createState(currentDifficulty);
    running = true;
    paused = false;
    pausedByHidden = false;
    overlayReady.classList.add('hidden');
    overlayOver.classList.add('hidden');
    overlayPause.classList.add('hidden');
    btnPause.hidden = false;
    shareArea.innerHTML = '';
    lastTick = performance.now();
    scoreEl.textContent = '0';
    loop(lastTick);
  }

  // 暂停 / 继续
  function pauseGame() {
    if (!running || paused) return;
    paused = true;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    overlayPause.classList.remove('hidden');
  }
  function resumeGame() {
    if (!paused) return;
    paused = false;
    overlayPause.classList.add('hidden');
    lastTick = performance.now();
    loop(lastTick);
  }

  // 游戏结束：写入记录并展示结束页
  function gameOver() {
    running = false;
    paused = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    btnPause.hidden = true;
    overlayPause.classList.add('hidden');
    var result = SnakeStorage.addRecord(state.score);
    finalScoreEl.textContent = state.score;
    finalBestEl.textContent = result.best;
    overlayOver.classList.remove('hidden');
    renderRecords();
  }

  // 主循环：按固定 tick 步进
  function loop(now) {
    if (!running) return;
    if (paused) { rafId = null; return; } // 暂停时停止帧循环
    rafId = requestAnimationFrame(loop);
    if (now - lastTick >= state.tickInterval) {
      lastTick = now;
      var evt = SnakeCore.step(state);
      scoreEl.textContent = state.score;
      if (evt === 'dead') {
        gameOver();
        return;
      }
      SnakeRender.draw(ctx, state);
    }
  }

  // ---------- 输入绑定 ----------
  SnakeInput.setup({
    stage: canvas,
    onDirection: function (dir) {
      if (running && !paused && state) SnakeCore.setDirection(state, dir);
    },
    onAction: function () {
      // 非游戏进行中时，空格/回车开始或重开
      if (!running) startGame();
    },
    onPause: function () {
      // 游戏中：空格/P 切换暂停
      if (!running) return;
      if (paused) resumeGame(); else pauseGame();
    }
  });

  // ---------- 按钮事件 ----------
  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', startGame);
  btnPause.addEventListener('click', function () {
    if (paused) resumeGame(); else pauseGame();
  });
  btnResume.addEventListener('click', resumeGame);
  btnShare.addEventListener('click', function () {
    if (!state) return;
    SnakeShare.generate({
      score: state.score,
      best: SnakeStorage.getBest(),
      mount: shareArea
    });
  });

  // ---------- 难度选择 ----------
  if (diffGroup) {
    diffGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('.diff-btn');
      if (!btn) return;
      currentDifficulty = btn.getAttribute('data-diff');
      var btns = diffGroup.querySelectorAll('.diff-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle('active', btns[i] === btn);
      }
    });
  }

  // ---------- 页面切后台暂停，回前台恢复 ----------
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && running) {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      pausedByHidden = true;
    } else if (!document.hidden && pausedByHidden) {
      pausedByHidden = false;
      running = true;
      lastTick = performance.now();
      loop(lastTick);
    }
  });

  // ---------- 初始化 ----------
  fitCanvas();
  // 窗口尺寸变化时重新适配画布并重绘当前画面
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      fitCanvas();
      if (state) SnakeRender.draw(ctx, state);
    }, 150);
  });
  toReady();
})();
