import { COLS, ROWS } from '../../unit/const'

export default {
  props: ['snake', 'food', 'wallPass', 'reset', 'status'],
  data() {
    return {
      ctx: null,
      cellSize: 0
    }
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d')
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
      const ctx = this.ctx
      if (!ctx) return
      const canvas = this.$refs.canvas
      const cs = Math.floor(canvas.width / COLS)
      this.cellSize = cs

      // 背景
      ctx.fillStyle = '#9ead86'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 网格线
      ctx.strokeStyle = 'rgba(135, 147, 114, 0.6)'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath()
        ctx.moveTo(x * cs + 0.5, 0)
        ctx.lineTo(x * cs + 0.5, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * cs + 0.5)
        ctx.lineTo(canvas.width, y * cs + 0.5)
        ctx.stroke()
      }

      // 食物
      if (this.food) {
        this.drawCell(this.food.x, this.food.y, '#560000')
      }

      // 蛇身
      if (this.snake && this.snake.body) {
        const body = this.snake.body
        for (let i = 0; i < body.length; i++) {
          const seg = body[i]
          const isHead = i === body.length - 1
          this.drawCell(seg.x, seg.y, isHead ? '#000' : '#879372')
        }
      }
    },
    drawCell(gx, gy, color) {
      const ctx = this.ctx
      const cs = this.cellSize
      const border = 2
      const inner = cs - border * 2
      ctx.fillStyle = color
      ctx.fillRect(gx * cs + border, gy * cs + border, inner, inner)
    }
  }
}