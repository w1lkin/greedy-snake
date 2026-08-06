import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import store from '../../vuex/store'
import todo from '../../control/todo'

const fired = {}

export default {
  props: ['filling', 'wallPass', 'difficulty'],
  data() { return { fillingNum: 0 } },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) { this.fillingNum = nextProps.filling + 20 }
    }
  },
  computed: {
    keyboard() { return this.$store.state.keyboard },
    labelUp: () => i18n.rotation[lan],       // 复用"旋转"标签文本
    labelLeft: () => i18n.left[lan],
    labelRight: () => i18n.right[lan],
    labelDown: () => i18n.down[lan],
    labelResetR: () => `${i18n.reset[lan]}(R)`,
    labelSoundS: () => `${i18n.sound[lan]}(S)`,
    labelPauseP: () => `${i18n.pause[lan]}(P)`
  },
  methods: {
    onUpStart(e) {
      if (e) e.preventDefault()
      if (fired.up) return; fired.up = true
      store.commit('key_up', true)
      todo.up.down(store)
    },
    onUpEnd() { fired.up = false; store.commit('key_up', false); todo.up.up(store) },
    onDownStart(e) {
      if (e) e.preventDefault()
      if (fired.down) return; fired.down = true
      store.commit('key_down', true)
      todo.down.down(store)
    },
    onDownEnd() { fired.down = false; store.commit('key_down', false); todo.down.up(store) },
    onLeftStart(e) {
      if (e) e.preventDefault()
      if (fired.left) return; fired.left = true
      store.commit('key_left', true)
      todo.left.down(store)
    },
    onLeftEnd() { fired.left = false; store.commit('key_left', false); todo.left.up(store) },
    onRightStart(e) {
      if (e) e.preventDefault()
      if (fired.right) return; fired.right = true
      store.commit('key_right', true)
      todo.right.down(store)
    },
    onRightEnd() { fired.right = false; store.commit('key_right', false); todo.right.up(store) },
    onReset(e) {
      if (e) e.preventDefault()
      // 统一走 todo.r.down（和键盘 R 键一致）
      todo.r.down(store)
    },
    onPause(e) {
      if (e) e.preventDefault()
      // 统一走 todo.p.down（和键盘 Space/P 键一致）
      todo.p.down(store)
    },
    onMusic(e) {
      if (e) e.preventDefault()
      if (store.state.lock) return
      store.commit('music', !store.state.music)
      store.commit('key_music', true)
      setTimeout(() => store.commit('key_music', false), 150)
    }
  },
  components: { Vbutton }
}
