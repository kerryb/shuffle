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
    element.addEventListener("keydown", checkInput)
    solution.appendChild(element)
  }
}

function checkInput(event) {
  if (event.key == "Backspace") {
    event.preventDefault()
    deleteLetterOrMoveFocusToPreviousLetter(event.target)
  } else if (isNormalCharacter(event)) {
    event.preventDefault()
    setLetterIfValid(event)
  }
}

function isNormalCharacter(event) {
  return event.key.length == 1 && !event.altKey && !event.ctrlKey && !event.metaKey
}

function deleteLetterOrMoveFocusToPreviousLetter(element) {
  if (element.value == "") {
    moveFocusToPreviousInput(element)
  } else {
    Shuffled.addLetter(document.getElementById("shuffled"), element.value)
    element.value = ""
  }
}

function setLetterIfValid(event) {
  const letter = event.key.toUpperCase()
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
  if (nextInput == null) {
    return
  } else if (nextInput.tagName == "INPUT") {
    nextInput.focus()
  } else {
    moveFocusToNextInput(nextInput)
  }
}

function moveFocusToPreviousInput(input) {
  const previousInput = input.previousSibling
  if (previousInput == null) {
    return
  } else if (previousInput.tagName == "INPUT") {
    previousInput.focus()
  } else {
    moveFocusToPreviousInput(previousInput)
  }
}

export default { addInputs }
