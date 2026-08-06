import event from '../../unit/event'
import states from '../states'

const downFn = store => {
  store.commit('key_pause', true)
  event.down({
    key: 'p',
    once: true,
    callback: () => {
      const state = store.state
      // gameover 中：先停止 overEnd 动画再重新开始
      if (state.status === 'gameover') {
        states.overEnd()
        states.start()
      } else if (state.status === 'playing') {
        states.pause(!state.pause)
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
