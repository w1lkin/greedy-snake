import { createSnake, spawnFood } from '../unit/snake'
import { DIFFICULTIES } from '../unit/const'

const mutations = {
  snake(state, data) {
    state.snake = data
  },
  food(state, data) {
    state.food = data
  },
  wallPass(state, data) {
    state.wallPass = data
  },
  status(state, data) {
    state.status = data
  },
  difficulty(state, data) {
    state.difficulty = data
  },
  speedRun(state, data) {
    state.speedRun = data
  },
  points(state, data) {
    state.points = data
  },
  max(state, data) {
    state.max = data
  },
  pause(state, data) {
    state.pause = data
  },
  music(state, data) {
    state.music = data
  },
  reset(state, data) {
    state.reset = data
  },
  lock(state, data) {
    state.lock = data
  },
  focus(state, data) {
    state.focus = data
  },
  key_up(state, data) {
    state.keyboard.up = data
  },
  key_down(state, data) {
    state.keyboard.down = data
  },
  key_left(state, data) {
    state.keyboard.left = data
  },
  key_right(state, data) {
    state.keyboard.right = data
  },
  key_reset(state, data) {
    state.keyboard.reset = data
  },
  key_music(state, data) {
    state.keyboard.music = data
  },
  key_pause(state, data) {
    state.keyboard.pause = data
  }
}

export default mutations
