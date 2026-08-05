import store from '../vuex/store'
import todo from './todo'

const keyboard = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  87: 'up',     // W
  65: 'left',   // A
  83: 'down',   // S
  68: 'right',  // D
  32: 'pause',  // Space = 暂停/开始
  80: 'p',      // P = 暂停
  82: 'r'       // R = 重置
}

let keydownActive

const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10))

const keyDown = e => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) return
  const type = keyboard[e.keyCode]
  if (type === keydownActive) return
  keydownActive = type
  todo[type].down(store)
}

const keyUp = e => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) return
  const type = keyboard[e.keyCode]
  if (type === keydownActive) keydownActive = ''
  todo[type].up(store)
}

document.addEventListener('keydown', keyDown, true)
document.addEventListener('keyup', keyUp, true)
