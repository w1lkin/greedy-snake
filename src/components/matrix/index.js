import { COLS, ROWS } from '../../unit/const'

export default {
  props: ['snake', 'food', 'wallPass', 'reset', 'status'],
  data() {
    return {
      canvas: null,
      ctx: null,
      cellSize: 0
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.render()
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.$nextTick(() => this.render())
      }
    }
  },
  methods: {
    render() {
      if (!this.ctx) return
      const ctx = this.ctx
      const canvas = this.canvas
      const cellSize = Math.floor(canvas.width / COLS)
      this.cellSize = cellSize

      // 背景
      ctx.fillStyle = '#9ead86'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 网格线
      ctx.strokeStyle = '#879372'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath()
        ctx.moveTo(x * cellSize, 0)
        ctx.lineTo(x * cellSize, ROWS * cellSize)
        ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * cellSize)
        ctx.lineTo(COLS * cellSize, y * cellSize)
        ctx.stroke()
      }

      // 绘制食物
      if (this.food) {
        this.drawCell(this.food.x, this.food.y, '#e74c3c')
      }

      // 绘制蛇身
      if (this.snake && this.snake.body) {
        const body = this.snake.body
        for (let i = 0; i < body.length; i++) {
          const seg = body[i]
          const isHead = i === body.length - 1
          this.drawCell(seg.x, seg.y, isHead ? '#2c3e50' : '#34495e')
        }
      }
    },
    drawCell(gx, gy, color) {
      const ctx = this.ctx
      const cs = this.cellSize
      const padding = 1
      ctx.fillStyle = color
      ctx.fillRect(gx * cs + padding, gy * cs + padding, cs - padding * 2, cs - padding * 2)
    }
  },
  render(h) {
    return h('div', { class: 'matrix' }, [
      h('canvas', {
        ref: 'canvas',
        attrs: { width: 220, height: 220 }
      })
    ])
  }
}
