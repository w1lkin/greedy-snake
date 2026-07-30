// share.js
// 分享卡：采用 share-card-generator 技能模式，在离屏 canvas 绘制 1200×1600
// 像素复古分享卡，并用全屏覆盖层展示，支持「长按保存」分享到微信。
// 主题：像素绿（与游戏一致）。

(function (global) {
  'use strict';

  // 分享链接：部署后填入你的网址；留空则不显示二维码（降级为无码卡片）
  var SHARE_URL = 'https://greedy-snake-3wq.pages.dev/';

  // 圆角矩形路径
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  // 在卡片上画一个像素小蛇 + 食物，采用诺基亚绿屏风格
  function drawPixelSnake(ctx) {
    var dark = '#0f1f14', grid = '#8bac0f', bg = '#9bbc8f';
    var u = 26; // 单元像素
    var ox = 600 - 3 * u, oy = 470;
    // 蛇身路径（格子坐标）
    var body = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2]];
    body.forEach(function (p) {
      // 浅绿描边 + 黑块
      ctx.fillStyle = grid;
      ctx.fillRect(ox + p[0] * u, oy + p[1] * u, u - 3, u - 3);
      ctx.fillStyle = dark;
      ctx.fillRect(ox + p[0] * u + 2, oy + p[1] * u + 2, u - 7, u - 7);
    });
    // 蛇头双眼
    ctx.fillStyle = bg;
    ctx.fillRect(ox + 4, oy + 4, 4, 4);
    ctx.fillRect(ox + 12, oy + 4, 4, 4);
    // 食物
    ctx.fillStyle = grid;
    ctx.fillRect(ox + 4 * u, oy + 2 * u, u - 3, u - 3);
    ctx.fillStyle = dark;
    ctx.fillRect(ox + 4 * u + 2, oy + 2 * u + 2, u - 7, u - 7);
  }

  // 生成分享卡 canvas（1200×1600），score/best 为动态分数
  function generateShareCard(opts) {
    var score = opts.score || 0;
    var best = opts.best || 0;
    var canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    var ctx = canvas.getContext('2d');
    var W = 1200, H = 1600;

    // 诺基亚绿屏复古主题
    var theme = {
      bg: '#8bac0f', bgGradTop: '#9bbc8f', bgGradBot: '#8bac0f',
      cardBg: '#9bbc8f', accent: '#0f1f14',
      accentDim: 'rgba(15,31,20,0.35)', accentShadow: 'rgba(15,31,20,0.2)',
      textTitle: '#0f1f14', textSub: '#5d6e4b', textFeature: '#0f1f14',
      textHint: '#5d6e4b', dividerColor: '#8bac0f'
    };

    // 背景渐变
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, W, H);
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, theme.bgGradTop);
    g.addColorStop(1, theme.bgGradBot);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 装饰圆
    ctx.globalAlpha = 0.06;
    [
      { x: 200, y: 400, r: 280 }, { x: 1000, y: 300, r: 180 },
      { x: 1050, y: 1200, r: 320 }, { x: 150, y: 1300, r: 160 },
      { x: 600, y: 200, r: 100 }
    ].forEach(function (d) {
      ctx.fillStyle = theme.accent;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    });
    // 星点
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = theme.accent;
    for (var i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(80 + Math.random() * (W - 160), 80 + Math.random() * (H - 160), 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 内容卡
    ctx.fillStyle = theme.cardBg;
    ctx.shadowColor = theme.accentShadow;
    ctx.shadowBlur = 60; ctx.shadowOffsetY = 8;
    rr(ctx, 90, 220, W - 180, H - 560, 40); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.strokeStyle = theme.accentDim; ctx.lineWidth = 2;
    rr(ctx, 90, 220, W - 180, H - 560, 40); ctx.stroke();

    // 顶部装饰线
    ctx.strokeStyle = theme.accent; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(200, 140); ctx.lineTo(W - 200, 140); ctx.stroke();

    // 标题
    ctx.fillStyle = theme.textTitle;
    ctx.font = "bold 84px -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText('贪吃蛇', W / 2, 380);

    // 像素小蛇图案
    drawPixelSnake(ctx);

    // 分数（动态）
    ctx.fillStyle = theme.accent;
    ctx.font = "52px -apple-system, 'PingFang SC', sans-serif";
    ctx.fillText('本局 ' + score + ' 分 · 最高 ' + best + ' 分', W / 2, 640);

    // 副标题
    ctx.fillStyle = theme.textSub;
    ctx.font = "40px -apple-system, 'PingFang SC', sans-serif";
    ctx.fillText('HTML5 像素复古 · 贪吃蛇小游戏', W / 2, 720);

    // 虚线分割
    ctx.strokeStyle = theme.dividerColor; ctx.lineWidth = 2;
    ctx.setLineDash([14, 10]);
    ctx.beginPath(); ctx.moveTo(200, 790); ctx.lineTo(W - 200, 790); ctx.stroke();
    ctx.setLineDash([]);

    // 特性列表
    var features = ['⌨  键盘 / 触屏双控', '💾  本地保存最近 10 次', '🐍  越吃越长 · 越玩越快'];
    ctx.fillStyle = theme.textFeature;
    ctx.font = "36px -apple-system, 'PingFang SC', sans-serif";
    features.forEach(function (f, i) { ctx.fillText(f, W / 2, 880 + i * 84); });

    // 标语
    ctx.fillStyle = theme.accent;
    ctx.font = "italic 34px 'Times New Roman', 'Songti SC', serif";
    ctx.fillText('挑战你的反应极限！', W / 2, 1310);

    return canvas;
  }

  // 显示 / 隐藏全屏覆盖层
  function showOverlay(canvas) {
    var img = document.getElementById('share-card-img');
    if (img) img.src = canvas.toDataURL('image/png');
    var overlay = document.getElementById('share-overlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  function hideShareCard() {
    var overlay = document.getElementById('share-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // 主入口：按钮点击触发，opts: { score, best }
  function generate(opts) {
    opts = opts || {};
    var W = 1200, H = 1600;

    // 动态创建覆盖层
    var overlay = document.getElementById('share-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'share-overlay';
      overlay.className = 'share-overlay';
      overlay.innerHTML =
        '<img class="share-card-img" id="share-card-img" src="" alt="分享卡片" crossorigin="anonymous">' +
        '<p class="share-hint">长按图片保存，发到微信群</p>' +
        '<button class="share-close" id="share-close-btn">关闭</button>';
      document.body.appendChild(overlay);
      document.getElementById('share-close-btn').onclick = hideShareCard;
      overlay.onclick = function (e) { if (e.target === overlay) hideShareCard(); };
    }

    var canvas = generateShareCard(opts);
    var ctx = canvas.getContext('2d');

    // 二维码：有链接才加载，失败则降级
    if (SHARE_URL) {
      var qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.onload = function () {
        var qs = 260, qx = (W - qs) / 2, qy = H - 360;
        ctx.fillStyle = '#FFF';
        rr(ctx, qx - 24, qy - 24, qs + 48, qs + 48, 32); ctx.fill();
        ctx.strokeStyle = '#0f1f14'; ctx.lineWidth = 2;
        rr(ctx, qx - 24, qy - 24, qs + 48, qs + 48, 32); ctx.stroke();
        ctx.drawImage(qrImg, qx, qy, qs, qs);
        ctx.fillStyle = '#5d6e4b';
        ctx.font = "26px -apple-system, 'PingFang SC', sans-serif";
        ctx.fillText('扫码或长按识别 · 和朋友一起玩', W / 2, H - 40);
        showOverlay(canvas);
      };
      qrImg.onerror = function () { showOverlay(canvas); };
      qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=' + encodeURIComponent(SHARE_URL) + '&margin=8';
    } else {
      showOverlay(canvas);
    }
  }

  global.SnakeShare = { generate: generate };
})(window);
