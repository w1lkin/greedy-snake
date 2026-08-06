import { setDirection } from '../../unit/snake'
import event from '../../unit/event'
import states from '../states'
import { music } from '../../unit/music'
import { DIR } from '../../unit/const'

const down = store => {
  store.commit('key_left', true)
  event.down({
    key: 'left',
    begin: 150,
    interval: 80,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.snake && state.status === 'playing') {
        if (state.pause) { states.pause(false); return }
        if (music.move) music.move()
        store.commit('snake', setDirection(state.snake, DIR.LEFT))
      } else {
        // 非游戏状态：循环调整级别 (1→6→1)
        const next = state.speedStart === 0 ? 5 : state.speedStart - 1
        store.commit('speedStart', next)
        store.commit('speedRun', next)
      }
    }
  })
}

const up = store => {
  store.commit('key_left', false)
  event.up({ key: 'left' })
}

export default { down, up }
