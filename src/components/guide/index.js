import { i18n, lan } from '../../unit/const'
import { isMobile } from '../../unit'
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
    difficultyLabel: () => i18n.difficulty[lan]
  },
  mounted() {
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  methods: {
    resize() {
      this.isMobile = isMobile()
    }
  }
}