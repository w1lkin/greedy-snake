import event from '../../unit/event'
import states from '../states'

const downFn = store => {
  store.commit('key_reset', true)
  event.down({
    key: 'r',
    once: true,
    callback: () => {
      if (store.state.status === 'playing') {
        states.overStart(true)
      } else if (store.state.status === 'gameover') {
        states.overEnd()
        states.start()
      } else {
        states.start()
      }
      event.up({ key: 'r' })
    }
  })
}

const upFn = store => {
  store.commit('key_reset', false)
  event.up({ key: 'r' })
}

export default { down: downFn, up: upFn }
