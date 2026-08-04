import event from '../../unit/event'
import states from '../states'

const downFn = store => {
  store.commit('key_reset', true)
  if (store.state.lock) return
  event.down({
    key: 'r',
    once: true,
    callback: () => {
      if (store.state.lock) return
      if (store.state.status === 'playing') {
        states.overStart(true)
      } else {
        states.start()
      }
    }
  })
}

const upFn = store => {
  store.commit('key_reset', false)
  event.up({ key: 'r' })
}

export default { down: downFn, up: upFn }
