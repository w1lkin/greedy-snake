import store from '../vuex/store'
import { createSnake, spawnFood, step } from '../unit/snake'
import { DIFFICULTIES, SCORE_PER_FOOD } from '../unit/const'
import { music } from '../unit/music'

const states = {
  tickInterval: null,
  overTimeout: null,

  // 重置到 ready 状态
  resetToReady: () => {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('snake', null)
    store.commit('food', null)
    store.commit('status', 'ready')
    store.commit('reset', false)
    store.commit('lock', false)
    store.commit('points', 0)
  },

  // 游戏开始
  start: () => {
    if (music.start) {
      music.start()
    }
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    const state = store.state
    const snake = createSnake()
    const food = spawnFood(snake, state.wallPass)
    const diff = DIFFICULTIES[state.difficulty]
    store.commit('snake', snake)
    store.commit('food', food)
    store.commit('speedRun', diff.tickInterval)
    store.commit('points', 0)
    store.commit('status', 'playing')
    store.commit('lock', false)
    store.commit('pause', false)
    store.commit('reset', false)
    states.auto()
  },

  // 自动前进
  auto: timeout => {
    const out = timeout < 0 ? 0 : timeout
    let state = store.state
    const tick = () => {
      state = store.state
      if (state.status !== 'playing' || state.pause) return
      const result = step(state.snake, state.food, state.wallPass)
      store.commit('snake', result.snake)

      if (result.event === 'dead') {
        states.overStart(true)
        return
      }

      if (result.event === 'eat') {
        if (music.eat) music.eat()
        const newPoints = state.points + SCORE_PER_FOOD
        store.commit('points', newPoints)
        if (newPoints > state.max) {
          store.commit('max', newPoints)
        }
        const diff = DIFFICULTIES[state.difficulty]
        let newSpeed = state.speedRun - diff.speedStep
        if (newSpeed < diff.minTick) newSpeed = diff.minTick
        store.commit('speedRun', newSpeed)
        const newFood = spawnFood(result.snake, state.wallPass)
        store.commit('food', newFood)
      }

      if (result.event === 'move') {
        if (music.move) music.move()
      }

      clearTimeout(states.tickInterval)
      states.tickInterval = setTimeout(tick, state.speedRun)
    }

    clearTimeout(states.tickInterval)
    states.tickInterval = setTimeout(
      tick,
      out === undefined ? store.state.speedRun : out
    )
  },

  // 暂停/恢复
  pause: isPause => {
    store.commit('pause', isPause)
    if (isPause) {
      clearTimeout(states.tickInterval)
      return
    }
    if (store.state.status === 'playing') {
      states.auto()
    }
  },

  // 焦点变化
  focus: isFocus => {
    store.commit('focus', isFocus)
    if (!isFocus) {
      clearTimeout(states.tickInterval)
      return
    }
    const state = store.state
    if (state.status === 'playing' && !state.pause && !state.reset) {
      states.auto()
    }
  },

  // 游戏结束动画开始
  overStart: (shouldSubmit) => {
    clearTimeout(states.tickInterval)
    store.commit('reset', true)
    store.commit('status', 'gameover')
    store.commit('pause', false)
    store.commit('lock', true)

    if (music.death) {
      music.death()
    }

    if (shouldSubmit) {
      const finalPoints = store.state.points
      if (finalPoints > 0) {
        const trySubmit = (retries) => {
          if (window.GamePlatform && typeof window.GamePlatform.submitScore === 'function') {
            window.GamePlatform.submitScore('greedy-snake', finalPoints)
              .then(() => { console.log('[greedy-snake] score submitted:', finalPoints) })
              .catch((e) => { console.warn('[greedy-snake] submitScore failed:', e && e.message) })
          } else if (retries > 0) {
            setTimeout(() => trySubmit(retries - 1), 1000)
          } else {
            console.warn('[greedy-snake] GamePlatform SDK not available after retries, score not submitted:', finalPoints)
          }
        }
        trySubmit(5)
      }
    }

    // 延迟调用 overEnd 解锁
    clearTimeout(states.overTimeout)
    states.overTimeout = setTimeout(() => {
      states.overEnd()
    }, 1200)
  },

  // 游戏结束动画完成
  overEnd: () => {
    clearTimeout(states.tickInterval)
    store.commit('snake', null)
    store.commit('food', null)
    store.commit('status', 'ready')
    store.commit('reset', false)
    store.commit('lock', false)
    store.commit('points', 0)
  }
}

export default states