const digitalElement = document.querySelector('.digital')
const sElement = document.querySelector('.p_s')
const mElement = document.querySelector('.p_m')
const hElement = document.querySelector('.p_h')

function updateClock() {
  const now = new Date()
  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours()

  // fix the times that are < 10, which has only 2 characters by default
  digitalElement.innerHTML = `<span class="hr">${fixZero(
    hours
  )}</span>:<span class="min">${fixZero(
    minutes
  )}</span>:<span class="sec">${fixZero(seconds)}</span>`

  // fix the pointers positions
  const sDeg = (360 / 60) * seconds + 270 // (360 deg in a circle)/(60 seconds) * seconds to set the position + 270 deg so the pointer start in 0
  const mDeg = (360 / 60) * minutes + 270
  const hDeg = (360 / 12) * hours + 270

  sElement.style.transform = `rotate(${sDeg}deg)`
  mElement.style.transform = `rotate(${mDeg}deg)`
  hElement.style.transform = `rotate(${hDeg}deg)`
}

function fixZero(time) {
  if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}

function changeDigitalClockColor() {
  const now = new Date()
  const seconds = now.getSeconds()
  const minutes = now.getMinutes()

  const secColor = digitalElement.querySelector('.sec')
  secColor.classList.add('color')
  secColor.classList.remove('std-color')
  setTimeout(() => {
    secColor.classList.add('std-color')
    secColor.classList.remove('color')
  }, 250)

  if (seconds == 0) {
    console.log('rodei!')
    const minColor = digitalElement.querySelector('.min')
    minColor.classList.add('color')
    minColor.classList.remove('std-color')
    setTimeout(() => {
      minColor.classList.add('std-color')
      minColor.classList.remove('color')
    }, 250)
  }

  if (minutes == 0 && seconds == 0) {
    console.log('rodei também!')
    const hrColor = digitalElement.querySelector('.hr')
    hrColor.classList.add('color')
    hrColor.classList.remove('std-color')
    setTimeout(() => {
      hrColor.classList.add('std-color')
      hrColor.classList.remove('color')
    }, 250)
  }
}

setInterval(updateClock, 1000)
setInterval(changeDigitalClockColor, 1000)
updateClock()
