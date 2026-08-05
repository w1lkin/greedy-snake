import { setDirection } from '../../unit/snake'
import event from '../../unit/event'
import states from '../states'
import { music } from '../../unit/music'
import { DIR } from '../../unit/const'

const downFn = store => {
  store.commit('key_down', true)
  event.down({
    key: 'down',
    begin: 150,
    interval: 80,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.snake && state.status === 'playing') {
        if (state.pause) { states.pause(false); return }
        if (music.move) music.move()
        store.commit('snake', setDirection(state.snake, DIR.DOWN))
      } else {
        // 非游戏状态：切换穿墙
        store.commit('wallPass', !state.wallPass)
      }
    }
  })
}

const upFn = store => {
  store.commit('key_down', false)
  event.up({ key: 'down' })
}

export default { down: downFn, up: upFn }
