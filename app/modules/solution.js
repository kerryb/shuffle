import { default as Shuffled } from "/modules/shuffled.js"

function addInputs(enumeration) {
  const solution = document.getElementById("solution")
  solution.innerHTML = ""

  for (const value of enumeration.split(/([,-])/)) {
    addInput(solution, value)
  }
}

function addInput(solution, value) {
  if (value == ",") {
    addSpan(solution, "space", " ")
  } else if (value == "-") {
    addSpan(solution, "hyphen", "-")
  } else {
    addWord(solution, parseInt(value))
  }
}

function addSpan(solution, className, character) {
  const element = document.createElement("span")
  element.className = className
  const text = document.createTextNode(character)
  element.appendChild(text)
  solution.appendChild(element)
}

function addWord(solution, letterCount) {
  for (let n = 0; n < letterCount; n++) {
    const element = document.createElement("input")
    element.id = `solution-${n}`
    const size = document.createAttribute("size")
    size.value = "1"
    element.setAttributeNode(size)
    element.addEventListener("beforeinput", checkInput)
    solution.appendChild(element)
  }
}

function checkInput(event) {
  event.preventDefault()
  if (event.inputType.startsWith("deleteContentBackward")) {
    deleteLetterIfPresent(event.target)
  } else {
    setLetterIfValid(event)
  }
}

function deleteLetterIfPresent(element) {
  if (element.value != "") {
    Shuffled.addLetter(document.getElementById("shuffled"), element.value)
    element.value = ""
  }
}

function setLetterIfValid(event) {
  const letter = event.data.toUpperCase()
  const letters = Array.from(document.querySelectorAll("#shuffled span.letter"))
  const index = letters.findIndex((span) => span.innerHTML == letter)
  if (index != -1) {
    returnExistingLetterToShuffledIfNotEmpty(event.target.value)
    letters[index].remove()
    event.target.value = letter
    moveFocusToNextInput(event.target)
  }
}

function returnExistingLetterToShuffledIfNotEmpty(letter) {
  if (letter != "") {
    Shuffled.addLetter(document.getElementById("shuffled"), letter)
  }
}

function moveFocusToNextInput(input) {
  const nextInput = input.nextSibling
  if (nextInput != null) {
    nextInput.focus()
  }
}

export default { addInputs }
