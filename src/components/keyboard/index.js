import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import store from '../../vuex/store'
import todo from '../../control/todo'
export default {
  props: ['filling'],
  data() {
    return {
      fillingNum: 0
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.fillingNum = nextProps.filling + 20
      }
    }
  },
  computed: {
    keyboard() {
      return this.$store.state.keyboard
    },
    labelUp: () => i18n.up[lan],
    labelLeft: () => i18n.left[lan],
    labelRight: () => i18n.right[lan],
    labelDown: () => i18n.down[lan],
    labelResetR: () => `${i18n.reset[lan]}(R)`,
    labelSoundS: () => `${i18n.sound[lan]}(S)`,
    labelPauseP: () => `${i18n.pause[lan]}(P)`
  },
  methods: {
    onUpDown() { todo.up.down(store) },
    onUpUp() { todo.up.up(store) },
    onDownDown() { todo.down.down(store) },
    onDownUp() { todo.down.up(store) },
    onLeftDown() { todo.left.down(store) },
    onLeftUp() { todo.left.up(store) },
    onRightDown() { todo.right.down(store) },
    onRightUp() { todo.right.up(store) },
    onReset() { todo.r.down(store) },
    onPause() { todo.p.down(store) },
    onMusic() {
      if (store.state.lock) return
      store.commit('music', !store.state.music)
      store.commit('key_music', true)
      setTimeout(() => store.commit('key_music', false), 150)
    }
  },
  components: {
    Vbutton
  }
}