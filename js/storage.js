// storage.js
// 云端存储模块：负责「最近 10 次记录」与「历史最高分」的读写（原 localStorage 已移除）。
// 战绩上报走 GamePlatform.submitScore，历史读取走 GamePlatform.getMyScores。

(function (global) {
  'use strict';

  var MAX_RECORDS = 10;
  // 内存缓存最近一次的最高分，供同步展示用
  var _bestCache = 0;

  // 读取最近记录（异步，数组最新在前）
  function getRecords() {
    return global.GamePlatform.getMyScores('greedy-snake', MAX_RECORDS).then(function (items) {
      return items.map(function (it) { return { score: it.score, date: new Date(it.created_at).toISOString() }; });
    }).catch(function () { return []; });
  }

  // 读取历史最高分（异步，数字）
  function getBest() {
    return getRecords().then(function (list) {
      var best = 0;
      for (var i = 0; i < list.length; i++) if (list[i].score > best) best = list[i].score;
      _bestCache = best;
      return best;
    }).catch(function () { return 0; });
  }

  // 追加一局记录：score = 蛇长度（越大越好）。同步触发云端上报，返回含 best 的对象。
  function addRecord(score, difficulty) {
    try {
      global.GamePlatform.submitScore('greedy-snake', score, { difficulty: difficulty });
    } catch (e) { console.warn('submit score failed:', e); }
    var best = (score > _bestCache) ? score : _bestCache;
    _bestCache = best;
    return { records: [], best: best };
  }

  // 对外暴露接口
  global.SnakeStorage = {
    getRecords: getRecords,
    getBest: getBest,
    addRecord: addRecord,
    MAX_RECORDS: MAX_RECORDS
  };
})(window);
