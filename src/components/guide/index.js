import { i18n, lan } from '../../unit/const'

const DIFFICULTY_LABEL = {
  easy: i18n.level[lan] + ' 1',
  normal: i18n.level[lan] + ' 2',
  hard: i18n.level[lan] + ' 3'
}

export default {
  name: 'Guide',
  props: ['wallPass', 'difficulty'],
  computed: {
    highestScoreLabel: () => i18n.highestScore[lan],
    difficultyLabel: () => i18n.difficulty[lan],
    wallPassLabel: () => i18n.wallPass[lan]
  },
  methods: {
    $t(key) {
      return DIFFICULTY_LABEL[key] || key
    }
  }
}