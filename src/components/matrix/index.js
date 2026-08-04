import { COLS, ROWS } from '../../unit/const'

export default {
  props: ['snake', 'food', 'wallPass', 'reset', 'status'],
  computed: {
    grid() {
      const grid = []
      for (let y = 0; y < ROWS; y++) {
        const row = []
        for (let x = 0; x < COLS; x++) {
          row.push(0)
        }
        grid.push(row)
      }
      // 食物
      if (this.food) {
        grid[this.food.y][this.food.x] = 2
      }
      // 蛇身
      if (this.snake && this.snake.body) {
        this.snake.body.forEach((seg, i) => {
          grid[seg.y][seg.x] = 1
        })
      }
      return grid
    }
  }
}
