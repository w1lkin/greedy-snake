import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { isFocus } from '../unit/'
import { lastRecord, maxPoint, speeds } from '../unit/const'
import { hasWebAudioAPI } from '../unit/music'
Vue.use(Vuex)

let musicInitState = lastRecord && lastRecord.music !== undefined ? !!lastRecord.music : true
if (!hasWebAudioAPI.data) musicInitState = false

let maxInitState = lastRecord && !isNaN(parseInt(lastRecord.max, 10)) ? parseInt(lastRecord.max, 10) : 0
if (maxInitState < 0) maxInitState = 0
else if (maxInitState > maxPoint) maxInitState = maxPoint

let pointsInitState = lastRecord && !isNaN(parseInt(lastRecord.points, 10)) ? parseInt(lastRecord.points, 10) : 0
if (pointsInitState < 0) pointsInitState = 0
else if (pointsInitState > maxPoint) pointsInitState = maxPoint

// 初始速度等级（0-5）
let speedStartInit = lastRecord && !isNaN(parseInt(lastRecord.speedStart, 10))
  ? parseInt(lastRecord.speedStart, 10) : 1
if (speedStartInit < 0) speedStartInit = 0
if (speedStartInit > 5) speedStartInit = 5

const wallPassInitState = lastRecord && lastRecord.wallPass !== undefined ? !!lastRecord.wallPass : false

const lockInitState = lastRecord && lastRecord.lock !== undefined ? !!lastRecord.lock : false
const pauseInitState = lastRecord && lastRecord.pause !== undefined ? !!lastRecord.pause : false
const resetInitState = lastRecord && lastRecord.reset ? !!lastRecord.reset : false

const state = {
  // 游戏核心
  snake: null,
  food: null,
  wallPass: wallPassInitState,
  matrix: (() => {
    const m = []
    for (let y = 0; y < 20; y++) {
      const row = []
      for (let x = 0; x < 10; x++) row.push(0)
      m.push(row)
    }
    return m
  })(),

  // 游戏控制
  status: 'ready',
  speedStart: speedStartInit,  // 初始速度等级 (0-5)
  speedRun: speedStartInit,    // 当前速度等级 (0-5，游戏中进行加速)
  foodCount: 0,

  // 分数
  points: pointsInitState,
  max: maxInitState,

  // UI
  music: musicInitState,
  pause: pauseInitState,
  reset: resetInitState,
  lock: lockInitState,
  focus: isFocus(),
  keyboard: { up: false, down: false, left: false, right: false, reset: false, music: false, pause: false }
}

export default new Vuex.Store({ state, mutations })
