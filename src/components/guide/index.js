import { i18n, lan } from '../../unit/const'
import { isMobile } from '../../unit'
import store from '../../vuex/store'
export default {
  name: 'Guide',
  props: ['wallPass', 'difficulty'],
  data() {
    return {
      isMobile: isMobile()
    }
  },
  computed: {
    wallPassLabel: () => i18n.wallPass[lan],
    difficultyLabel: () => i18n.difficulty[lan],
    easyLabel: () => i18n.level && i18n.level[lan] ? i18n.level[lan] + ' (Easy)' : 'Easy',
    normalLabel: () => i18n.level && i18n.level[lan] ? i18n.level[lan] + ' (Normal)' : 'Normal',
    hardLabel: () => i18n.level && i18n.level[lan] ? i18n.level[lan] + ' (Hard)' : 'Hard'
  },
  mounted() {
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  methods: {
    resize() {
      this.isMobile = isMobile()
    },
    toggleWallPass() {
      store.commit('wallPass', !store.state.wallPass)
    },
    changeDifficulty(e) {
      store.commit('difficulty', e.target.value)
    }
  }
}
