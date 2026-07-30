// main.js
// 入口：状态机(ready/playing/gameover)、游戏主循环、UI 串联。
// 依赖：SnakeStorage, SnakeCore, SnakeRender, SnakeInput, SnakeShare

(function () {
  'use strict';

  // ---------- DOM 引用 ----------
  var canvas = document.getElementById('board');
  var ctx = canvas.getContext('2d');

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
  var shareArea = document.getElementById('share-area');

  // ---------- 运行时状态 ----------
  var state = null;        // 当前游戏状态（SnakeCore.createState 产出）
  var running = false;     // 主循环是否运行
  var lastTick = 0;        // 上次步进时间戳
  var rafId = null;        // requestAnimationFrame 句柄
  var pausedByHidden = false; // 是否因页面切后台而暂停

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
    overlayReady.classList.remove('hidden');
    overlayOver.classList.add('hidden');
    state = SnakeCore.createState();
    SnakeRender.draw(ctx, state);
    renderRecords();
    scoreEl.textContent = '0';
  }

  // 开始 / 重新开始游戏
  function startGame() {
    state = SnakeCore.createState();
    running = true;
    pausedByHidden = false;
    overlayReady.classList.add('hidden');
    overlayOver.classList.add('hidden');
    shareArea.innerHTML = '';
    lastTick = performance.now();
    scoreEl.textContent = '0';
    loop(lastTick);
  }

  // 游戏结束：写入记录并展示结束页
  function gameOver() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    var result = SnakeStorage.addRecord(state.score);
    finalScoreEl.textContent = state.score;
    finalBestEl.textContent = result.best;
    overlayOver.classList.remove('hidden');
    renderRecords();
  }

  // 主循环：按固定 tick 步进
  function loop(now) {
    if (!running) return;
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
      if (running && state) SnakeCore.setDirection(state, dir);
    },
    onAction: function () {
      // 非游戏进行中时，空格/回车开始或重开
      if (!running) startGame();
    }
  });

  // ---------- 按钮事件 ----------
  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', startGame);
  btnShare.addEventListener('click', function () {
    if (!state) return;
    SnakeShare.generate({
      score: state.score,
      best: SnakeStorage.getBest(),
      mount: shareArea
    });
  });

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
  toReady();
})();
