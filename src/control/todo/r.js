import event from '../../unit/event'
import states from '../states'

const down = store => {
  store.commit('key_reset', true)
  if (store.state.lock) return
  if (store.state.snake !== null) {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        states.overStart(true)
      }
    })
  } else {
    event.down({
      key: 'r',
      once: true,
      callback: () => {
        if (store.state.lock) return
        states.start()
      }
    })
  }
}

const up = store => {
  store.commit('key_reset', false)
  event.up({ key: 'r' })
}

export default { down, up }
