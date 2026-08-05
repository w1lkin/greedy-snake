import { i18n, lan } from '../../unit/const'
import { isMobile } from '../../unit'
import store from '../../vuex/store'
export default {
  name: 'Guide',
  data() {
    return {
      isMobile: isMobile()
    }
  },
  computed: {
    wallPassLabel: () => i18n.wallPass[lan],
    difficultyLabel: () => i18n.difficulty[lan]
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
    setDifficulty(d) {
      store.commit('difficulty', d)
    }
  }
}
