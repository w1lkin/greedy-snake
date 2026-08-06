const eventName = {}
const eventFired = {}  // 记录 once 事件是否已触发

const down = o => {
  // once 事件防抖：已触发过就不再执行
  if (o.once && eventFired[o.key]) return

  const keys = Object.keys(eventName)
  keys.forEach(i => {
    clearTimeout(eventName[i])
    eventName[i] = null
  })
  if (!o.callback) return
  const clear = () => {
    clearTimeout(eventName[o.key])
  }
  o.callback(clear)

  if (o.once === true) {
    eventFired[o.key] = true
    return
  }
  let begin = o.begin || 100
  const interval = o.interval || 50
  const loop = () => {
    eventName[o.key] = setTimeout(() => {
      begin = null
      loop()
      o.callback(clear)
    }, begin || interval)
  }
  loop()
}

const up = o => {
  clearTimeout(eventName[o.key])
  eventName[o.key] = null
  eventFired[o.key] = false  // 重置 once 状态
  if (!o.callback) return
  o.callback()
}

const clearAll = () => {
  const keys = Object.keys(eventName)
  keys.forEach(i => {
    clearTimeout(eventName[i])
    eventName[i] = null
  })
}

export default { down, up, clearAll }
