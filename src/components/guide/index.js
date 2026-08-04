import { i18n, lan } from '../../unit/const'
import { isMobile } from '../../unit'

const DIFF_TEXT = {
  easy: '1 (Easy)',
  normal: '2 (Normal)',
  hard: '3 (Hard)'
}

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
    difficultyText() {
      return DIFF_TEXT[this.difficulty] || this.difficulty
    }
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
