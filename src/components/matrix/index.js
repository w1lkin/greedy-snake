import { COLS, ROWS } from '../../unit/const'

export default {
  props: ['snake', 'food', 'reset', 'status'],
  render() {
    const grid = this.buildGrid()
    const cls = 'matrix' + (this.reset ? ' reset' : '')
    return (
      <div class={cls}>
        {grid.map((row, k1) =>
          <p key={k1}>
            {row.map((cell, k2) => {
              const cellCls = (cell === 1 ? 'c' : '') + ' ' + (cell === 2 ? 'd' : '')
              return <b key={k2} class={cellCls} />
            })}
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
      if (this.food) {
        grid[this.food.y][this.food.x] = 2
      }
      if (this.snake && this.snake.body) {
        this.snake.body.forEach(seg => {
          grid[seg.y][seg.x] = 1
        })
      }
      return grid
    }
  }
}
