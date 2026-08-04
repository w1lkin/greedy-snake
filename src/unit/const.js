import i18nJSON from '../i18n.json'

// 网格尺寸
export const COLS = 20
export const ROWS = 20

// 方向常量
export const DIR = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
}

// 难度配置: [初始速度(ms), 最低速度(ms), 每吃食物加速(ms)]
export const DIFFICULTIES = {
  easy: { tickInterval: 160, minTick: 110, speedStep: 2 },
  normal: { tickInterval: 120, minTick: 60, speedStep: 4 },
  hard: { tickInterval: 80, minTick: 40, speedStep: 6 }
}

// 分数
export const SCORE_PER_FOOD = 10
export const maxPoint = 999999

// localStorage key
export const StorageKey = 'VUE_SNAKE'

// 上次记录
export const lastRecord = (() => {
  let data = window.localStorage.getItem(StorageKey)
  if (!data) {
    return false
  }
  try {
    if (window.btoa) {
      data = atob(data)
    }
    data = decodeURIComponent(data)
    data = JSON.parse(data)
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e)
    }
    return false
  }
  return data
})()

// CSS transform 兼容
export const transform = (function() {
  const trans = [
    'transform',
    'webkitTransform',
    'msTransform',
    'mozTransform',
    'oTransform'
  ]
  const body = document.body
  return trans.filter(e => body.style[e] !== undefined)[0]
})()

// 获取 URL 参数
export const getParam = param => {
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`)
  const m = window.location.toString().match(r)
  return m ? decodeURI(m[1]) : ''
}

// 语言检测
export const lan = (() => {
  let l = getParam('lan').toLowerCase()
  if (!l && navigator.languages) {
    l = navigator.languages.find(l => i18nJSON.lan.indexOf(l) !== -1)
  }
  l = i18nJSON.lan.indexOf(l) === -1 ? i18nJSON.default : l
  return l
})()

document.title = i18nJSON.data.title[lan]

export let i18n = i18nJSON.data
