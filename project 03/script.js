const date = new Date()
const weekDay = date.getDay()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const weekDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

document.querySelector('.busca').addEventListener('submit', async event => {
  event.preventDefault() // previni o comportamento padrão, nesse caso é enviar o formulário e limpar o input

  const input = document.querySelector('#searchInput').value

  if (input !== '') {
    clearInfo()
    showWarning('Loading...')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=1ee28d82d53982315fca93f0ec3c4cc4&units=metric&lang=pt_br`

    const results = await fetch(url) // await faz a requisição e aguarda o resultado
    const json = await results.json() // aqui, pega o resultado e transorma em json

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('City not found')
    }
  }

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    keyboard: true
  })
})

function showInfo(json) {
  showWarning('')

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`
  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`

  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    )

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.windAngle + 270
  }deg)`

  document.querySelector('.diaSemana').innerHTML = `${weekDayNames[weekDay]}`
  document.querySelector('.mes').innerHTML = `${monthNames[month]}`
  document.querySelector('.dia').innerHTML = `${day}`
  if (day === 1 || day === 21 || day === 31) {
    document.querySelector('.numeral').innerHTML = 'st,'
  } else if (day === 2 || day === 22) {
    document.querySelector('.numeral').innerHTML = 'nd,'
  } else if (day === 3 || day === 23) {
    document.querySelector('.numeral').innerHTML = `rd,`
  } else {
    document.querySelector('.numeral').innerHTML = `th,`
  }
  document.querySelector('.ano').innerHTML = `${year}`

  document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
  showWarning('')

  document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}
