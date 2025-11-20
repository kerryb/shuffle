import { default as Fodder } from "/modules/fodder.js"
import { default as Utils } from "/modules/utils.js"

function element() {
  return document.getElementById("shuffled")
}

function letterElements() {
  return document.querySelectorAll("#shuffled span.letter")
}

function shuffleLetters(event) {
  event.preventDefault()
  const letters = existingShuffledLettersOrFodder()

  const shuffled = element()
  shuffled.textContent = ""

  for (const letter of Utils.shuffleArray(letters)) {
    addLetter(shuffled, letter)
  }
}

function existingShuffledLettersOrFodder() {
  const letters = Array.from(letterElements()).map((x) => x.innerHTML)
  if (letters.length > 0) {
    return letters
  } else {
    return Fodder.element().value.split("")
  }
}

function clear() {
  element().textContent = ""
}

function addLetter(shuffled, letter) {
  const element = document.createElement("span")
  element.className = "letter"
  const text = document.createTextNode(letter)
  element.appendChild(text)
  shuffled.appendChild(element)
}

export default { shuffleLetters, clear, addLetter }
