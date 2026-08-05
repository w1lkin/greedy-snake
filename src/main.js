import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

import './unit/const'
import './control'
import { subscribeRecord } from './unit'
import states from './control/states'

subscribeRecord(store)

// 首次用户交互后自动开始游戏
let started = false
const startOnce = () => {
  if (started) return
  started = true
  states.start()
}
document.addEventListener('touchstart', startOnce, { once: true })
document.addEventListener('mousedown', startOnce, { once: true })
document.addEventListener('keydown', startOnce, { once: true })

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
  store
})
