import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

import './unit/const'
import './control'
import { subscribeRecord } from './unit'

subscribeRecord(store)

// 从云端回拉历史最高分（本地 max 作为离线兜底，云端成功则取较大值并回写）
const initMaxFromCloud = () => {
  if (window.GamePlatform && typeof window.GamePlatform.getMyScores === 'function') {
    window.GamePlatform.getMyScores('greedy-snake', 200).then(items => {
      if (items && items.length > 0) {
        const cloudBest = Math.max(...items.map(it => it.score));
        const localBest = store.state.max || 0;
        const best = Math.max(cloudBest, localBest);
        if (best > localBest) store.commit('max', best);
      }
    }).catch(() => {});
  }
};
initMaxFromCloud();

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
  store
})
