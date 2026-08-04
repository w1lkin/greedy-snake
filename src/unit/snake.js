import { COLS, ROWS, DIR } from './const'

// 蛇初始长度
const INIT_LEN = 3

// 创建初始蛇状态
export function createSnake() {
  const startX = Math.floor(COLS / 2)
  const startY = Math.floor(ROWS / 2)
  const snake = []
  for (let i = INIT_LEN - 1; i >= 0; i--) {
    snake.push({ x: startX - i, y: startY })
  }
  return {
    body: snake,
    direction: DIR.RIGHT,
    nextDirection: DIR.RIGHT
  }
}

// 设置方向（禁止180度反向）
export function setDirection(snake, dir) {
  const cur = snake.direction
  // 不允许反向
  if (cur.x + dir.x === 0 && cur.y + dir.y === 0) {
    return snake
  }
  return { ...snake, nextDirection: dir }
}

// 随机生成食物
export function spawnFood(snake, wallPass) {
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

// 前进一步，返回 { snake, food, event: 'move'|'eat'|'dead' }
export function step(snake, food, wallPass) {
  const dir = snake.nextDirection
  const head = snake.body[snake.body.length - 1]
  let newX = head.x + dir.x
  let newY = head.y + dir.y

  // 穿墙处理
  if (wallPass) {
    if (newX < 0) newX = COLS - 1
    if (newX >= COLS) newX = 0
    if (newY < 0) newY = ROWS - 1
    if (newY >= ROWS) newY = 0
  } else {
    // 撞墙检测
    if (newX < 0 || newX >= COLS || newY < 0 || newY >= ROWS) {
      return { snake: { ...snake, direction: dir }, food, event: 'dead' }
    }
  }

  // 撞自身检测（不包括尾部，因为尾部会移动）
  for (let i = 0; i < snake.body.length - 1; i++) {
    if (snake.body[i].x === newX && snake.body[i].y === newY) {
      return { snake: { ...snake, direction: dir }, food, event: 'dead' }
    }
  }

  // 吃食检测
  const newHead = { x: newX, y: newY }
  const eating = food && newX === food.x && newY === food.y
  const newBody = [...snake.body, newHead]
  if (!eating) {
    newBody.shift() // 移除尾部
  }

  return {
    snake: { body: newBody, direction: dir, nextDirection: dir },
    food: eating ? null : food,
    event: eating ? 'eat' : 'move'
  }
}
