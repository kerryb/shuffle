import { default as Shuffled } from "/modules/shuffled.js"

function addInputs(enumeration) {
  const solution = document.getElementById("solution")
  solution.innerHTML = ""

  for (const value of enumeration.split(/([,-])/)) {
    if (value == ",") {
      addSpan(solution, "space", " ")
    } else if (value == "-") {
      addSpan(solution, "hyphen", "-")
    } else {
      addWord(solution, parseInt(value))
    }
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
    const size = document.createAttribute("size")
    size.value = "1"
    element.setAttributeNode(size)
    element.addEventListener("beforeinput", checkInput)
    solution.appendChild(element)
  }
}

function checkInput(e) {
  e.preventDefault()
  if (e.inputType.startsWith("deleteContentBackward")) {
    if (e.target.value != "") {
      Shuffled.addLetter(document.getElementById("shuffled"), e.target.value)
      e.target.value = ""
    }
  } else {
    const letter = e.data.toUpperCase()
    const letters = Array.from(document.querySelectorAll("#shuffled span.letter"))
    const index = letters.findIndex((span) => span.innerHTML == letter)
    if (index != -1) {
      if (e.target.value != "") {
        Shuffled.addLetter(document.getElementById("shuffled"), e.target.value)
      }
      letters[index].remove()
      e.target.value = letter
    }
  }
}

export default { addInputs }
