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
  mounted() {
    const touchEventCatch = {}
    const mouseDownEventCatch = {}

    document.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });

    // 映射 todo key 到 ref key
    const keyMap = {
      up: 'dom_up',
      down: 'dom_down',
      left: 'dom_left',
      right: 'dom_right',
      r: 'dom_r',
      s: 'dom_s',
      p: 'dom_p'
    }

    Object.keys(keyMap).forEach(key => {
      const refKey = keyMap[key]

      if (key === 's') {
        // 音效按钮：直接切换
        this.$refs[refKey].$el.addEventListener(
          'mousedown',
          () => {
            if (touchEventCatch[key] === true) return
            if (store.state.lock) return
            store.commit('music', !store.state.music)
            store.commit('key_music', true)
            mouseDownEventCatch[key] = true
          },
          true
        )
        this.$refs[refKey].$el.addEventListener(
          'mouseup',
          () => {
            store.commit('key_music', false)
            mouseDownEventCatch[key] = false
          },
          true
        )
        this.$refs[refKey].$el.addEventListener(
          'touchstart',
          (e) => {
            e.preventDefault()
            if (store.state.lock) return
            store.commit('music', !store.state.music)
            store.commit('key_music', true)
          },
          true
        )
        this.$refs[refKey].$el.addEventListener(
          'touchend',
          () => {
            store.commit('key_music', false)
          },
          true
        )
        return
      }

      if (!todo[key]) return

      this.$refs[refKey].$el.addEventListener(
        'mousedown',
        () => {
          if (touchEventCatch[key] === true) return
          todo[key].down(store)
          mouseDownEventCatch[key] = true
        },
        true
      )
      this.$refs[refKey].$el.addEventListener(
        'mouseup',
        () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false
            return
          }
          todo[key].up(store)
          mouseDownEventCatch[key] = false
        },
        true
      )
      this.$refs[refKey].$el.addEventListener(
        'mouseout',
        () => {
          if (mouseDownEventCatch[key] === true) {
            todo[key].up(store)
          }
        },
        true
      )
      this.$refs[refKey].$el.addEventListener(
        'touchstart',
        () => {
          touchEventCatch[key] = true
          todo[key].down(store)
        },
        true
      )
      this.$refs[refKey].$el.addEventListener(
        'touchend',
        () => {
          todo[key].up(store)
        },
        true
      )
    })
  },
  components: {
    Vbutton
  }
}
