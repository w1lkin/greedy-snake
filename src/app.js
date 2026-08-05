import Decorate from './components/decorate/index.vue'
import Guide from './components/guide/index.vue'
import Music from './components/music/index.vue'
import Pause from './components/pause/index.vue'
import Number from './components/number/index.vue'
import Point from './components/point/index.vue'
import Keyboard from './components/keyboard/index.vue'
import Matrix from './components/matrix/index.vue'
import { mapState } from 'vuex'
import { transform, i18n, lan } from './unit/const'
import { visibilityChangeEvent, isFocus } from './unit/'
import states from './control/states'

const DIFFICULTY_CODE = {
  easy: 1,
  normal: 2,
  hard: 3
}

export default {
  mounted() {
    this.render()
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  data() {
    return {
      size: {},
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      filling: ''
    }
  },
  components: {
    Decorate,
    Guide,
    Music,
    Pause,
    Number,
    Point,
    Keyboard,
    Matrix
  },
  computed: {
    difficultyLabel: () => i18n.difficulty[lan],
    wallPassLabel: () => i18n.wallPass[lan],
    difficultyCode() {
      return DIFFICULTY_CODE[this.difficulty] || 2
    },
    ...mapState([
      'snake',
      'food',
      'wallPass',
      'status',
      'difficulty',
      'speedRun',
      'points',
      'max',
      'reset',
      'pause',
      'music',
      'keyboard'
    ])
  },
  methods: {
    render() {
      let filling = 0
      const size = (() => {
        const w = this.w
        const h = this.h
        const ratio = h / w
        let scale
        let css = {}
        if (ratio < 1.5) {
          scale = h / 960
        } else {
          scale = w / 640
          filling = (h - 960 * scale) / scale / 3
          css = {
            'padding-top': Math.floor(filling) + 42 + 'px',
            'padding-bottom': Math.floor(filling) + 'px',
            'margin-top': Math.floor(-480 - filling * 1.5) + 'px'
          }
        }
        css[transform] = `scale(${scale})`
        return css
      })()
      this.size = size
      this.start()
      this.filling = filling
    },
    resize() {
      this.w = document.documentElement.clientWidth
      this.h = document.documentElement.clientHeight
      this.render()
    },
    start() {
      if (visibilityChangeEvent) {
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus())
          },
          false
        )
      }
    }
  }
}