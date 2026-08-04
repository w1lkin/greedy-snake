import { COLS, ROWS } from '../../unit/const'

const CANVAS_SIZE = 360

export default {
  props: ['snake', 'food', 'wallPass', 'reset', 'status'],
  data() {
    return {
      canvas: null,
      ctx: null,
      cellSize: 0,
      size: CANVAS_SIZE
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.resizeCanvas()
    this.render()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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
    onResize() {
      this.resizeCanvas()
      this.render()
    },
    resizeCanvas() {
      if (!this.canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = this.canvas.parentElement.getBoundingClientRect()
      const w = rect.width - 8
      this.size = w
      this.cellSize = Math.floor(w / COLS)
      const realSize = this.cellSize * COLS
      this.canvas.style.width = realSize + 'px'
      this.canvas.style.height = realSize + 'px'
      this.canvas.width = realSize * dpr
      this.canvas.height = realSize * dpr
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    },
    render() {
      if (!this.ctx) return
      const ctx = this.ctx
      const canvas = this.canvas
      const cs = this.cellSize
      const w = cs * COLS
      const h = cs * ROWS

      // 背景
      ctx.fillStyle = '#9ead86'
      ctx.fillRect(0, 0, w, h)

      // 网格线
      ctx.strokeStyle = 'rgba(135, 147, 114, 0.5)'
      ctx.lineWidth = 1
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath()
        ctx.moveTo(x * cs + 0.5, 0)
        ctx.lineTo(x * cs + 0.5, h)
        ctx.stroke()
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * cs + 0.5)
        ctx.lineTo(w, y * cs + 0.5)
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
      const padding = Math.max(1, Math.floor(cs * 0.1))
      ctx.fillStyle = color
      ctx.fillRect(gx * cs + padding, gy * cs + padding, cs - padding * 2, cs - padding * 2)
    }
  },
  render(h) {
    return h('div', { class: 'matrix' }, [
      h('canvas', {
        ref: 'canvas',
        attrs: { width: this.size, height: this.size }
      })
    ])
  }
}