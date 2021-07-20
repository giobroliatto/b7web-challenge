document.body.addEventListener('keyup', event => {
  playSound(event.code.toLowerCase())
})

document.querySelector('.composer button').addEventListener('click', () => {
  const song = document.querySelector('#input').value

  if (song !== '') {
    const songArray = song.split('')
    playComposition(songArray)
  }
})

/* const drums = document.querySelector('h1') */

function playSound(sound) {
  const audioElement = document.querySelector(`#s_${sound}`)
  const keyElement = document.querySelector(`div[data-key="${sound}"]`)

  if (audioElement) {
    audioElement.currentTime = 0
    audioElement.play()
  }

  if (keyElement) {
    keyElement.classList.add('active')

    setTimeout(() => {
      keyElement.classList.remove('active')
    }, 150)
  }
}

function playComposition(songArray) {
  let delay = 0

  for (const note of songArray) {
    setTimeout(() => {
      playSound(`key${note}`)
      /* drums.classList.remove('color') */
    }, delay)
    delay += 250
  }
}
