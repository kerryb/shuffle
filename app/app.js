function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => checkInput(e, /[\d,-]/))
  enumeration.addEventListener("change", updateEnumeration)

  const fodder = document.getElementById("fodder")
  fodder.addEventListener("beforeinput", (e) => checkInput(e, /[a-z]/i))
  fodder.addEventListener("input", upcaseInput)

  const form = document.getElementById("form")
  form.addEventListener("submit", shuffleLetters)
}

function checkInput(e, pattern) {
  if (e.inputType == "insertText" && !pattern.test(e.data)) {
    e.preventDefault()
  }
}

function upcaseInput(e) {
  e.target.value = e.target.value.toUpperCase()
}

function updateEnumeration(e) {
  e.target.reportValidity()
  if (e.target.validity.valid) {
    addSolutionInputs(e.target.value)
  }
}

function addSolutionInputs(enumeration) {
  const solution = document.getElementById("solution")
  solution.innerHTML = ""

  for (const value of enumeration.split(/([,-])/)) {
    if (value == ",") {
      addSpan(solution, "space", " ")
      // solution.append(" ")
    } else if (value == "-") {
      addSpan(solution, "hyphen", "-")
      // solution.append("-")
    } else {
      addSolutionWord(solution, parseInt(value))
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

function addSolutionWord(solution, letterCount) {
  for (let n = 0; n < letterCount; n++) {
    const element = document.createElement("input")

    const maxlength = document.createAttribute("maxlength")
    maxlength.value = "1"
    element.setAttributeNode(maxlength)

    const size = document.createAttribute("size")
    size.value = "1"
    element.setAttributeNode(size)
    solution.appendChild(element)
  }
}

function shuffleLetters(e) {
  e.preventDefault()
  const fodder = document.getElementById("fodder")
  const shuffled = document.getElementById("shuffled")

  for (const letter of shuffleArray(fodder.value.split(""))) {
    const element = document.createElement("span")
    element.className = "letter"
    const text = document.createTextNode(letter)
    element.appendChild(text)
    shuffled.appendChild(element)
  }
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

init()
