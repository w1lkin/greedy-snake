import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import store from '../../vuex/store'
import todo from '../../control/todo'
import states from '../../control/states'
import { setDirection } from '../../unit/snake'
import { DIR } from '../../unit/const'

// 一次性事件标志：避免 touchstart 和 click 双触发
const fired = {}

export default {
  props: ['filling', 'wallPass', 'difficulty'],
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
    labelPauseP: () => `${i18n.pause[lan]}(P)`,
    wallPassLabel: () => i18n.wallPass[lan],
    difficultyLabel: () => i18n.difficulty[lan]
  },
  methods: {
    // 方向按钮：按下立即移动，松开结束
    move(dir, key, keyKey) {
      const state = store.state
      if (state.lock) return
      if (state.snake && state.status === 'playing') {
        if (state.pause) {
          states.pause(false)
          return
        }
        const snake = setDirection(state.snake, dir)
        store.commit('snake', snake)
      }
    },
    onUpStart(e) {
      if (e) e.preventDefault()
      if (fired.up) return
      fired.up = true
      store.commit('key_up', true)
      this.move(DIR.UP, 'up')
    },
    onUpEnd() {
      fired.up = false
      store.commit('key_up', false)
    },
    onDownStart(e) {
      if (e) e.preventDefault()
      if (fired.down) return
      fired.down = true
      store.commit('key_down', true)
      this.move(DIR.DOWN, 'down')
    },
    onDownEnd() {
      fired.down = false
      store.commit('key_down', false)
    },
    onLeftStart(e) {
      if (e) e.preventDefault()
      if (fired.left) return
      fired.left = true
      store.commit('key_left', true)
      this.move(DIR.LEFT, 'left')
    },
    onLeftEnd() {
      fired.left = false
      store.commit('key_left', false)
    },
    onRightStart(e) {
      if (e) e.preventDefault()
      if (fired.right) return
      fired.right = true
      store.commit('key_right', true)
      this.move(DIR.RIGHT, 'right')
    },
    onRightEnd() {
      fired.right = false
      store.commit('key_right', false)
    },
    // 重开：playing 时强制结束，否则开始
    onReset(e) {
      if (e) e.preventDefault()
      if (store.state.lock) return
      if (store.state.status === 'playing') {
        states.overStart(true)
      } else if (store.state.status === 'gameover') {
        // 先强制结束当前游戏再开始
        states.overEnd()
        states.start()
      } else {
        states.start()
      }
      store.commit('key_reset', true)
      setTimeout(() => store.commit('key_reset', false), 200)
    },
    // 暂停/开始
    onPause(e) {
      if (e) e.preventDefault()
      if (store.state.lock) return
      if (store.state.status === 'gameover') {
        states.overEnd()
        states.start()
      } else if (store.state.status === 'playing') {
        states.pause(!store.state.pause)
      } else {
        states.start()
      }
      store.commit('key_pause', true)
      setTimeout(() => store.commit('key_pause', false), 200)
    },
    // 音效开关
    onMusic(e) {
      if (e) e.preventDefault()
      if (store.state.lock) return
      store.commit('music', !store.state.music)
      store.commit('key_music', true)
      setTimeout(() => store.commit('key_music', false), 150)
    },
    // 穿墙开关
    onToggleWall(e) {
      if (e) e.preventDefault()
      if (store.state.lock) return
      store.commit('wallPass', !store.state.wallPass)
    },
    // 难度切换
    setDiff(d) {
      return (e) => {
        if (e) e.preventDefault()
        if (store.state.lock) return
        store.commit('difficulty', d)
      }
    }
  },
  components: {
    Vbutton
  }
}