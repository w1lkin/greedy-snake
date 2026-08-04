import { StorageKey } from './const'

const hiddenProperty = (() => {
  // document[hiddenProperty] 可以判断页面是否失焦
  let names = ['hidden', 'webkitHidden', 'mozHidden', 'msHidden']
  names = names.filter(e => e in document)
  return names.length > 0 ? names[0] : false
})()

const unit = {
  subscribeRecord(store) {
    // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.state
      if (data.lock) {
        // 当状态为锁定, 不记录
        return
      }
      data = JSON.stringify(data)
      data = encodeURIComponent(data)
      if (window.btoa) {
        data = btoa(data)
      }
      window.localStorage.setItem(StorageKey, data)
    })
  },
  isMobile() {
    // 判断是否为移动端
    const ua = navigator.userAgent
    const android = /Android (\d+\.\d+)/.test(ua)
    const iphone = ua.indexOf('iPhone') > -1
    const ipod = ua.indexOf('iPod') > -1
    const ipad = ua.indexOf('iPad') > -1
    const nokiaN = ua.indexOf('NokiaN') > -1
    return android || iphone || ipod || ipad || nokiaN
  },
  visibilityChangeEvent: (() => {
    if (!hiddenProperty) {
      return false
    }
    return hiddenProperty.replace(/hidden/i, 'visibilitychange') // 如果属性有前缀, 相应的事件也有前缀
  })(),
  isFocus: () => {
    if (!hiddenProperty) {
      // 如果不存在该特性, 认为一直聚焦
      return true
    }
    return !document[hiddenProperty]
  }
}

export const {
  subscribeRecord,
  isMobile,
  visibilityChangeEvent,
  isFocus
} = unit
