import event from '../../unit/event'
import states from '../states'

const down = store => {
  store.commit('key_pause', true)
  event.down({
    key: 'p',
    once: true,
    callback: () => {
      const state = store.state
      if (state.lock) return
      if (state.snake !== null) {
        states.pause(!state.pause)
      } else {
        states.start()
      }
    }
  })
}

const up = store => {
  store.commit('key_pause', false)
  event.up({ key: 'p' })
}

export default { down, up }
