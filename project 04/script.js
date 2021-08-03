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

var t = setInterval(function () {
  var ele = document.querySelector('.blink')
  ele.style.visibility = ele.style.visibility == 'hidden' ? '' : 'hidden'
}, 350)

document.querySelector(`div[data-item=a1]`)

/* FUNCTIONS */
function itemClick(event) {
  let item = event.target.getAttribute('data-item')
  let color = document.querySelector(`div[data-item=${item}]`)

  if (gameStatus) {
    document.querySelector('.vez').classList.remove('blue')
    document.querySelector('.vez').classList.remove('pink')
  }

  if (gameStatus && frame[item] === '') {
    frame[item] = turn
    if (turn === 'X') {
      color.classList.add('pink')
      document.querySelector('.vez').classList.add('blue')
    } else {
      color.classList.add('blue')
      document.querySelector('.vez').classList.add('pink')
    }
    renderSquare()
    toggleTurn()
  }
}

function reset() {
  warning = ''
  document.querySelector('.vez').classList.remove('resultado')
  document.querySelector('.vez').classList.remove('pink')
  document.querySelector('.vez').classList.remove('blue')
  document.querySelector('.blink').style.visibility = ''
  document.querySelector('.infotitulo').classList.remove('blink')

  let random = Math.floor(Math.random() * 2)

  turn = random === 0 ? 'X' : 'O'
  if (turn === 'X') {
    document.querySelector('.vez').classList.add('pink')
  } else {
    document.querySelector('.vez').classList.add('blue')
  }

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
  document.querySelector('.infotitulo').innerHTML = 'Turn:'
  if (warning === 'X' || warning === 'O') {
    document.querySelector('.infotitulo').innerHTML = 'WINNER!'
    document.querySelector('.infotitulo').classList.add('blink')
  } else if (warning === 'Draw!') {
    document.querySelector('.infotitulo').innerHTML = "It's a"
  }
  document.querySelector('.vez').innerHTML = turn
  document.querySelector('.resultado').innerHTML = warning
}

function toggleTurn() {
  turn = turn === 'X' ? 'O' : 'X'
  renderInfo()
}

function checkGame() {
  if (checkWinnerFor('X')) {
    document.querySelector('.vez').classList.add('resultado')
    document.querySelector('.vez').classList.remove('blue')
    document.querySelector('.vez').classList.add('pink')
    warning = 'X'
    gameStatus = false
  } else if (checkWinnerFor('O')) {
    document.querySelector('.vez').classList.add('resultado')
    document.querySelector('.vez').classList.remove('pink')
    document.querySelector('.vez').classList.add('blue')
    warning = 'O'
    gameStatus = false
  } else if (draw()) {
    document.querySelector('.vez').classList.add('resultado')
    document.querySelector('.vez').classList.remove('pink')
    document.querySelector('.vez').classList.remove('blue')
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
