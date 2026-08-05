import event from '../../unit/event'
import states from '../states'

const downFn = store => {
  store.commit('key_pause', true)
  event.down({
    key: 'p',
    once: true,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.status === 'playing') {
        states.pause(!state.pause)
      } else if (state.status === 'gameover') {
        states.overEnd()
        states.start()
      } else {
        states.start()
      }
    }
  })
}

const upFn = store => {
  store.commit('key_pause', false)
  event.up({ key: 'p' })
}

export default { down: downFn, up: upFn }
