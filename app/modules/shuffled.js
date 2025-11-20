import { default as Utils } from "/modules/utils.js"

function shuffleLetters(e) {
  e.preventDefault()
  let letters = Array.from(document.querySelectorAll("#shuffled span.letter")).map((x) => x.innerHTML)
  if (letters.length == 0) {
    letters = document.getElementById("fodder").value.split("")
  }
  const shuffled = document.getElementById("shuffled")
  shuffled.textContent = ""

  for (const letter of Utils.shuffleArray(letters)) {
    addLetter(shuffled, letter)
  }
}

function addLetter(shuffled, letter) {
  const element = document.createElement("span")
  element.className = "letter"
  const text = document.createTextNode(letter)
  element.appendChild(text)
  shuffled.appendChild(element)
}

export default { shuffleLetters, addLetter }
