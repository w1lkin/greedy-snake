import { COLS, ROWS, DIR } from './const'

// 蛇初始长度
const INIT_LEN = 3

// 创建初始蛇状态：body[0] = 头, body[length-1] = 尾
export function createSnake() {
  const startX = Math.floor(COLS / 2)
  const startY = Math.floor(ROWS / 2)
  const body = []
  for (let i = 0; i < INIT_LEN; i++) {
    body.push({ x: startX + i, y: startY })
  }
  return {
    body,
    direction: DIR.RIGHT,
    nextDirection: DIR.RIGHT
  }
}

// 设置方向（禁止180度反向）
export function setDirection(snake, dir) {
  const cur = snake.direction
  if (cur.x + dir.x === 0 && cur.y + dir.y === 0) {
    return snake
  }
  return { ...snake, nextDirection: dir }
}

// 随机生成食物
export function spawnFood(snake) {
  const body = snake.body
  const occupied = new Set(body.map(p => `${p.x},${p.y}`))
  const empty = []
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (!occupied.has(`${x},${y}`)) {
        empty.push({ x, y })
      }
    }
  }
  if (empty.length === 0) return null
  return empty[Math.floor(Math.random() * empty.length)]
}

// 前进一步
export function step(snake, food, wallPass) {
  const dir = snake.nextDirection
  const head = snake.body[0]
  let newX = head.x + dir.x
  let newY = head.y + dir.y

  if (wallPass) {
    if (newX < 0) newX = COLS - 1
    if (newX >= COLS) newX = 0
    if (newY < 0) newY = ROWS - 1
    if (newY >= ROWS) newY = 0
  } else {
    if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) {
      return { snake: { ...snake, direction: dir }, food, event: 'dead' }
    }
  }

  // 撞自身（不含尾部，因为尾部会移走）
  for (let i = 0; i < snake.body.length - 1; i++) {
    if (snake.body[i].x === newX && snake.body[i].y === newY) {
      return { snake: { ...snake, direction: dir }, food, event: 'dead' }
    }
  }

  const newHead = { x: newX, y: newY }
  const eating = food && newX === food.x && newY === food.y
  const newBody = [newHead, ...snake.body]
  if (!eating) newBody.pop()

  return {
    snake: { body: newBody, direction: dir, nextDirection: dir },
    food: eating ? null : food,
    event: eating ? 'eat' : 'move'
  }
}

// 将蛇身+食物转为 20x10 矩阵（行列顺序和 tetris 一致：20 行 × 10 列）
export function toMatrix(snake, food) {
  const matrix = []
  for (let y = 0; y < ROWS; y++) {
    const row = []
    for (let x = 0; x < COLS; x++) {
      row.push(0)
    }
    matrix.push(row)
  }
  if (food) {
    matrix[food.y][food.x] = 2 // 食物：暗红
  }
  if (snake && snake.body) {
    snake.body.forEach(seg => {
      matrix[seg.y][seg.x] = 1 // 蛇身：黑色
    })
  }
  return matrix
}
