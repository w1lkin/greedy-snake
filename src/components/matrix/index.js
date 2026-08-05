import { COLS, ROWS } from '../../unit/const'

export default {
  props: ['snake', 'food', 'reset', 'status'],
  render() {
    const grid = this.buildGrid()
    return (
      <div class="matrix" class={this.reset ? 'reset' : ''}>
        {grid.map((row, k1) =>
          <p>
            {row.map((cell, k2) =>
              <b class={(cell === 1 ? 'c' : '') + (cell === 2 ? 'd' : '')} />
            )}
          </p>
        )}
      </div>
    )
  },
  methods: {
    buildGrid() {
      const grid = []
      for (let y = 0; y < ROWS; y++) {
        const row = []
        for (let x = 0; x < COLS; x++) {
          row.push(0)
        }
        grid.push(row)
      }
      // 食物 (暗红)
      if (this.food) {
        grid[this.food.y][this.food.x] = 2
      }
      // 蛇身 (黑色)
      if (this.snake && this.snake.body) {
        this.snake.body.forEach(seg => {
          grid[seg.y][seg.x] = 1
        })
      }
      return grid
    }
  }
}
