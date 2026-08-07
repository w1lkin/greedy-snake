import store from '../vuex/store'
import { createSnake, spawnFood, step, toMatrix } from '../unit/snake'
import { speeds, eachFoods, SCORE_PER_FOOD, COLS, ROWS } from '../unit/const'
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
    store.commit('snake', snake)
    store.commit('food', food)
    store.commit('speedRun', state.speedStart)
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
        // 每吃 eachFoods 个食物，自动升一级（加速）
        if (state.foodCount % eachFoods === 0 && state.speedRun < 5) {
          store.commit('speedRun', state.speedRun + 1)
        }
        const newFood = spawnFood(result.snake)
        store.commit('food', newFood)
      }

      if (result.event === 'move') {
        if (music.move) music.move()
      }

      store.commit('matrix', toMatrix(store.state.snake, store.state.food))

      clearTimeout(states.tickInterval)
      states.tickInterval = setTimeout(tick, speeds[store.state.speedRun])
    }

    clearTimeout(states.tickInterval)
    states.tickInterval = setTimeout(tick, out === undefined ? speeds[store.state.speedRun] : out)
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

  entranceAnimation() {
    clearTimeout(states.overTimeout)
    store.commit('reset', true)
    const COLS = 10, ROWS = 20
    const newMatrix = []
    for (let y = 0; y < ROWS; y++) {
      const row = []
      for (let x = 0; x < COLS; x++) row.push(0)
      newMatrix.push(row)
    }
    store.commit('matrix', JSON.parse(JSON.stringify(newMatrix)))
    let row = ROWS - 1
    const fillUp = () => {
      if (row < 0) {
        states.overTimeout = setTimeout(() => {
          let clearRow = 0
          const clearDown = () => {
            if (clearRow >= ROWS) {
              states.overTimeout = setTimeout(() => {
                store.commit('reset', false)
              }, 200)
              return
            }
            for (let x = 0; x < COLS; x++) {
              newMatrix[clearRow][x] = 0
            }
            store.commit('matrix', JSON.parse(JSON.stringify(newMatrix)))
            clearRow++
            states.overTimeout = setTimeout(clearDown, 40)
          }
          clearDown()
        }, 400)
        return
      }
      for (let x = 0; x < COLS; x++) {
        newMatrix[row][x] = 1
      }
      store.commit('matrix', JSON.parse(JSON.stringify(newMatrix)))
      row--
      states.overTimeout = setTimeout(fillUp, 50)
    }
    fillUp()
  },

  overStart(shouldSubmit) {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('snake', null)
    store.commit('food', null)
    store.commit('reset', true)
    store.commit('status', 'gameover')
    store.commit('pause', false)

    if (music.death) music.death()

    if (shouldSubmit) {
      const finalPoints = store.state.points
      const speedStart = store.state.speedStart
      if (finalPoints > 0) {
        const trySubmit = retries => {
          if (window.GamePlatform && typeof window.GamePlatform.submitScore === 'function') {
            window.GamePlatform.submitScore('greedy-snake', finalPoints, { difficulty: speedStart })
              .then(() => { console.log('[greedy-snake] score submitted:', finalPoints, 'level=', speedStart) })
              .catch(e => { console.warn('[greedy-snake] submitScore failed:', e && e.message) })
          } else if (retries > 0) {
            setTimeout(() => trySubmit(retries - 1), 1000)
          }
        }
        trySubmit(5)
      }
    }

    const baseMatrix = store.state.matrix.length ? store.state.matrix : []
    const newMatrix = []
    for (let y = 0; y < ROWS; y++) {
      const row = []
      for (let x = 0; x < COLS; x++) {
        row.push(baseMatrix[y] ? baseMatrix[y][x] || 0 : 0)
      }
      newMatrix.push(row)
    }
    let row = ROWS - 1
    const fillUp = () => {
      if (row < 0) {
        states.overTimeout = setTimeout(() => {
          let clearRow = 0
          const clearDown = () => {
            if (clearRow >= ROWS) {
              states.overTimeout = setTimeout(() => states.overEnd(), 300)
              return
            }
            for (let x = 0; x < COLS; x++) {
              newMatrix[clearRow][x] = 0
            }
            store.commit('matrix', JSON.parse(JSON.stringify(newMatrix)))
            clearRow++
            states.overTimeout = setTimeout(clearDown, 40)
          }
          clearDown()
        }, 400)
        return
      }
      for (let x = 0; x < COLS; x++) {
        newMatrix[row][x] = 1
      }
      store.commit('matrix', JSON.parse(JSON.stringify(newMatrix)))
      row--
      states.overTimeout = setTimeout(fillUp, 50)
    }
    fillUp()
  },

  overEnd() {
    clearTimeout(states.tickInterval)
    clearTimeout(states.overTimeout)
    store.commit('snake', null)
    store.commit('food', null)
    const emptyMatrix = []
    for (let y = 0; y < ROWS; y++) {
      const row = []
      for (let x = 0; x < COLS; x++) row.push(0)
      emptyMatrix.push(row)
    }
    store.commit('matrix', emptyMatrix)
    store.commit('status', 'ready')
    store.commit('reset', false)
    store.commit('lock', false)
    store.commit('points', 0)
    store.commit('foodCount', 0)
  }
}

export default states
