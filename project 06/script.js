/* INITIAL DATA */
let currentQuestion = 0
let correctAnswers = 0

showQuestion()

/* EVENTS */
document
  .querySelector('.scoreArea button')
  .addEventListener('click', resetEvent)

/* FUNCTIONS */
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let pct = Math.floor((currentQuestion / questions.length) * 100)

    document.querySelector('.progress--bar').style.width = `${pct}%`

    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    document.querySelector('.question').innerHTML = `${
      parseInt(currentQuestion) + 1
    } - ${q.question}`

    let optionsHTML = ''
    let abcd = ['A', 'B', 'C', 'D']

    for (let i in q.options) {
      optionsHTML += `<div data-op="${i}" class="option"><span>${abcd[i]}</span>${q.options[i]}</div>`
    }
    document.querySelector('.options').innerHTML = optionsHTML

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    finishQuiz()
  }
}

function optionClickEvent(event) {
  let clickedOption = parseInt(event.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++
    document.querySelector('body').style.background = '#6add5b'
    setTimeout(() => {
      document.querySelector('body').style.background = '#191622'
    }, 350)
  } else {
    document.querySelector('body').style.background = '#c66969'
    setTimeout(() => {
      document.querySelector('body').style.background = '#191622'
    }, 350)
  }

  currentQuestion++
  showQuestion()
}

function finishQuiz() {
  let score = Math.floor((correctAnswers / questions.length) * 100)

  if (score < 30) {
    document.querySelector('.scoreText1').innerHTML = 'Nice try'
    document.querySelector('.scorePct').style.color = '#c03636'
    document.querySelector('.prizeImage').src = 'bronze.svg'
  } else if (score >= 30 && score < 70) {
    document.querySelector('.scoreText1').innerHTML = 'Not bad'
    document.querySelector('.scorePct').style.color = '#c3d617'
    document.querySelector('.prizeImage').src = 'silver.svg'
  } else if (score >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Well done!'
    document.querySelector('.scorePct').style.color = '#309c22'
    document.querySelector('.prizeImage').src = 'gold.svg'
  }

  document.querySelector(
    '.scorePct'
  ).innerHTML = `You got ${correctAnswers} outta ${questions.length}`

  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.progress--bar').style.width = `100%`
}

function resetEvent() {
  correctAnswers = 0
  currentQuestion = 0
  showQuestion()
}
