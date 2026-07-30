// storage.js
// 本地存储模块：负责「最近 10 次记录」与「历史最高分」的读写。
// 使用浏览器 localStorage，键名带版本号便于后续迁移。

(function (global) {
  'use strict';

  // 存储键名（带 _v1 版本后缀，避免与旧数据冲突）
  var RECORDS_KEY = 'snake_records_v1';
  var BEST_KEY = 'snake_best_v1';
  // 最多保留的记录条数
  var MAX_RECORDS = 10;

  // 安全读取 JSON：解析失败或环境不支持时返回 fallback
  function safeGet(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      // 隐私模式 / 存储不可用：降级为默认值
      return fallback;
    }
  }

  // 安全写入 JSON：失败仅忽略（不影响游戏进行）
  function safeSet(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // 忽略写入异常（如配额满、隐私模式）
    }
  }

  // 读取最近记录（数组，最新在前）
  function getRecords() {
    var list = safeGet(RECORDS_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  // 读取历史最高分（数字）
  function getBest() {
    var best = safeGet(BEST_KEY, 0);
    return (typeof best === 'number' && isFinite(best)) ? best : 0;
  }

  // 追加一局记录：{ score, date }，保留最近 MAX_RECORDS 条
  function addRecord(score) {
    var list = getRecords();
    list.unshift({
      score: score,
      date: new Date().toISOString()
    });
    if (list.length > MAX_RECORDS) {
      list = list.slice(0, MAX_RECORDS);
    }
    safeSet(RECORDS_KEY, list);

    // 同步更新最高分（取较大值）
    var best = getBest();
    if (score > best) {
      safeSet(BEST_KEY, score);
      best = score;
    }
    return { records: list, best: best };
  }

  // 对外暴露接口
  global.SnakeStorage = {
    getRecords: getRecords,
    getBest: getBest,
    addRecord: addRecord,
    MAX_RECORDS: MAX_RECORDS
  };
})(window);
