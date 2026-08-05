import { setDirection } from '../../unit/snake'
import event from '../../unit/event'
import states from '../states'
import { music } from '../../unit/music'
import { DIR, DIFFICULTIES } from '../../unit/const'

const downFn = store => {
  store.commit('key_right', true)
  event.down({
    key: 'right',
    begin: 150,
    interval: 80,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.snake && state.status === 'playing') {
        if (state.pause) { states.pause(false); return }
        if (music.move) music.move()
        store.commit('snake', setDirection(state.snake, DIR.RIGHT))
      } else {
        // 非游戏状态：调整难度
        const diffs = Object.keys(DIFFICULTIES)
        const idx = diffs.indexOf(state.difficulty)
        const nextIdx = (idx + 1) % diffs.length
        store.commit('difficulty', diffs[nextIdx])
      }
    }
  })
}

const upFn = store => {
  store.commit('key_right', false)
  event.up({ key: 'right' })
}

export default { down: downFn, up: upFn }
