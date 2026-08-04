import { setDirection } from '../../unit/snake'
import event from '../../unit/event'
import states from '../states'
import { music } from '../../unit/music'
import { DIR } from '../../unit/const'

const downFn = store => {
  store.commit('key_left', true)
  event.down({
    key: 'left',
    begin: 100,
    interval: 50,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.snake && state.status === 'playing') {
        if (state.pause) {
          states.pause(false)
          return
        }
        if (music.move) music.move()
        const snake = setDirection(state.snake, DIR.LEFT)
        store.commit('snake', snake)
      }
    }
  })
}

const upFn = store => {
  store.commit('key_left', false)
  event.up({ key: 'left' })
}

export default { down: downFn, up: upFn }
