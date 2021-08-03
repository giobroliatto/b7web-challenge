/* INITIAL DATA */

const frame = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}

let turn = ''
let warning = ''
let gameStatus = false

reset()

/* EVENTS */
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick)
})

/* FUNCTIONS */
function itemClick(event) {
  let item = event.target.getAttribute('data-item')
  let color = document.querySelector(`div[data-item=${item}`)

  if (gameStatus && frame[item] === '') {
    frame[item] = turn
    if (turn === 'X') {
      color.classList.add('pink')
    } else {
      color.classList.add('blue')
    }
    renderSquare()
    toggleTurn()
  }
}

function reset() {
  warning = ''

  let random = Math.floor(Math.random() * 2)

  turn = random === 0 ? 'X' : 'O'

  for (let i in frame) {
    frame[i] = ''
    let color = document.querySelector(`div[data-item=${i}`)
    color.classList.remove('pink')
    color.classList.remove('blue')
  }

  gameStatus = true

  renderSquare()
  renderInfo()
}

function renderSquare() {
  for (let i in frame) {
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = frame[i]
  }

  checkGame()
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = turn
  document.querySelector('.resultado').innerHTML = warning
}

function toggleTurn() {
  turn = turn === 'X' ? 'O' : 'X'
  renderInfo()
}

function checkGame() {
  if (checkWinnerFor('X')) {
    warning = 'X'
    gameStatus = false
  } else if (checkWinnerFor('O')) {
    warning = 'O'
    gameStatus = false
  } else if (draw()) {
    warning = 'Draw!'
    gameStatus = false
  }
}

function checkWinnerFor(turn) {
  let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',
    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for (let w in pos) {
    let pArray = pos[w].split(',')
    let hasWon = pArray.every(option => frame[option] === turn)
    if (hasWon) {
      return true
    }
  }

  return false
}

function draw() {
  for (let i in frame) {
    if (frame[i] === '') {
      return false
    }
  }
  return true
}
