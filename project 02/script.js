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
  digitalElement.innerHTML = `${fixZero(hours)}:${fixZero(minutes)}:${fixZero(
    seconds
  )}`

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

setInterval(updateClock, 1000)
updateClock()
