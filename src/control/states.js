import store from '../vuex/store'
import { createSnake, spawnFood, step, toMatrix } from '../unit/snake'
import { DIFFICULTIES, SCORE_PER_FOOD, ROWS } from '../unit/const'
import { music } from '../unit/music'

const states = {
  tickInterval: null,
  overTimeout: null,

  resetToReady() {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('snake', null)
    store.commit('food', null)
    store.commit('matrix', [])
    store.commit('status', 'ready')
    store.commit('reset', false)
    store.commit('lock', false)
    store.commit('points', 0)
    store.commit('foodCount', 0)
  },

  start() {
    if (music.start) music.start()
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    const state = store.state
    const snake = createSnake()
    const food = spawnFood(snake)
    const diff = DIFFICULTIES[state.difficulty]
    store.commit('snake', snake)
    store.commit('food', food)
    store.commit('speedRun', diff.tickInterval)
    store.commit('points', 0)
    store.commit('foodCount', 0)
    store.commit('status', 'playing')
    store.commit('lock', false)
    store.commit('pause', false)
    store.commit('reset', false)
    store.commit('matrix', toMatrix(snake, food))
    states.auto()
  },

  auto(timeout) {
    const out = timeout < 0 ? 0 : timeout
    const tick = () => {
      const state = store.state
      if (state.status !== 'playing' || state.pause) return
      const result = step(state.snake, state.food, state.wallPass)
      store.commit('snake', result.snake)

      if (result.event === 'dead') {
        store.commit('matrix', toMatrix(result.snake, state.food))
        states.overStart(true)
        return
      }

      if (result.event === 'eat') {
        if (music.eat) music.eat()
        const newPoints = state.points + SCORE_PER_FOOD
        store.commit('points', newPoints)
        store.commit('foodCount', state.foodCount + 1)
        if (newPoints > state.max) store.commit('max', newPoints)
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

      store.commit('matrix', toMatrix(store.state.snake, store.state.food))

      clearTimeout(states.tickInterval)
      states.tickInterval = setTimeout(tick, store.state.speedRun)
    }

    clearTimeout(states.tickInterval)
    states.tickInterval = setTimeout(tick, out === undefined ? store.state.speedRun : out)
  },

  pause(isPause) {
    store.commit('pause', isPause)
    if (isPause) { clearTimeout(states.tickInterval); return }
    if (store.state.status === 'playing') states.auto()
  },

  focus(isFocus) {
    store.commit('focus', isFocus)
    if (!isFocus) { clearTimeout(states.tickInterval); return }
    const state = store.state
    if (state.status === 'playing' && !state.pause && !state.reset) states.auto()
  },

  overStart(shouldSubmit) {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('reset', true)
    store.commit('status', 'gameover')
    store.commit('pause', false)
    // 注意：不设 lock=true，否则用户按 P/R 无法重启

    if (music.death) music.death()

    if (shouldSubmit) {
      const finalPoints = store.state.points
      if (finalPoints > 0) {
        const trySubmit = retries => {
          if (window.GamePlatform && typeof window.GamePlatform.submitScore === 'function') {
            window.GamePlatform.submitScore('greedy-snake', finalPoints)
              .then(() => { console.log('[greedy-snake] score submitted:', finalPoints) })
              .catch(e => { console.warn('[greedy-snake] submitScore failed:', e && e.message) })
          } else if (retries > 0) {
            setTimeout(() => trySubmit(retries - 1), 1000)
          }
        }
        trySubmit(5)
      }
    }

    // 结束动画：逐行暗红填充
    const matrix = store.state.matrix
    if (!matrix.length) {
      states.overTimeout = setTimeout(() => states.overEnd(), 800)
      return
    }
    const newMatrix = JSON.parse(JSON.stringify(matrix))
    let row = ROWS - 1
    const fillStep = () => {
      if (row < 0) {
        states.overTimeout = setTimeout(() => states.overEnd(), 300)
        return
      }
      for (let x = 0; x < newMatrix[row].length; x++) {
        newMatrix[row][x] = 2
      }
      store.commit('matrix', newMatrix)
      row--
      states.overTimeout = setTimeout(fillStep, 60)
    }
    fillStep()
  },

  overEnd() {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('snake', null)
    store.commit('food', null)
    store.commit('matrix', [])
    store.commit('status', 'ready')
    store.commit('reset', false)
    store.commit('lock', false)
    store.commit('points', 0)
    store.commit('foodCount', 0)
  }
}

export default states
