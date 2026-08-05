import { StorageKey } from './const'

const hiddenProperty = (() => {
  let names = ['hidden', 'webkitHidden', 'mozHidden', 'msHidden']
  names = names.filter(e => e in document)
  return names.length > 0 ? names[0] : false
})()

const unit = {
  subscribeRecord(store) {
    store.subscribe(() => {
      let data = store.state
      if (data.lock) return
      data = JSON.stringify(data)
      data = encodeURIComponent(data)
      if (window.btoa) data = btoa(data)
      window.localStorage.setItem(StorageKey, data)
    })
  },
  isMobile() {
    const ua = navigator.userAgent
    const android = /Android (\d+\.\d+)/.test(ua)
    const iphone = ua.indexOf('iPhone') > -1
    const ipod = ua.indexOf('iPod') > -1
    const ipad = ua.indexOf('iPad') > -1
    const nokiaN = ua.indexOf('NokiaN') > -1
    return android || iphone || ipod || ipad || nokiaN
  },
  visibilityChangeEvent: (() => {
    if (!hiddenProperty) return false
    return hiddenProperty.replace(/hidden/i, 'visibilitychange')
  })(),
  isFocus: () => {
    if (!hiddenProperty) return true
    return !document[hiddenProperty]
  }
}

export const { subscribeRecord, isMobile, visibilityChangeEvent, isFocus } = unit
