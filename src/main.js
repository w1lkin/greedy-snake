import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

import './unit/const';
import './control';
import { subscribeRecord } from './unit';
import states from './control/states';

subscribeRecord(store); // 将更新的状态记录到localStorage

// 等待 GamePlatform 就绪后再开始游戏
const tryStart = (retries) => {
  const state = store.state
  if (state.status === 'ready') {
    states.start()
    return
  }
  if (retries > 0) {
    setTimeout(() => tryStart(retries - 1), 200)
  }
}

// 用户首次点击/触摸后开始游戏
let started = false
const startOnce = () => {
  if (started) return
  started = true
  tryStart(20)
}
document.addEventListener('touchstart', startOnce, { once: false })
document.addEventListener('mousedown', startOnce, { once: false })
document.addEventListener('keydown', startOnce, { once: false })

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
  store: store
})