function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => restrictInput(e, /[\d,-]/))
  enumeration.addEventListener("change", updateEnumeration)

  const fodder = document.getElementById("fodder")
  fodder.addEventListener("beforeinput", (e) => restrictInput(e, /[a-z]/i))
  fodder.addEventListener("input", upcaseInput)

  const form = document.getElementById("form")
  form.addEventListener("submit", shuffleLetters)
}

function restrictInput(e, pattern) {
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
    const fodder = document.getElementById("fodder")
    fodder.value = ""
    fodder.maxLength = letterCount(e.target.value)
    addSolutionInputs(e.target.value)
    document.getElementById("shuffled").textContent = ""
  }
}

function letterCount(enumeration) {
  return enumeration.split(/[,-]/).map((n) => parseInt(n)).reduce((a, b) => a + b)
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
    const size = document.createAttribute("size")
    size.value = "1"
    element.setAttributeNode(size)
    element.addEventListener("beforeinput", checkSolutionInput)
    solution.appendChild(element)
  }
}

function checkSolutionInput(e) {
  e.preventDefault()
  if (e.inputType.startsWith("deleteContentBackward")) {
    if (e.target.value != "") {
      addLetterToShuffled(document.getElementById("shuffled"), e.target.value)
      e.target.value = ""
    }
  } else {
    const letter = e.data.toUpperCase()
    const letters = Array.from(document.querySelectorAll("#shuffled span.letter"))
    const index = letters.findIndex((span) => span.innerHTML == letter)
    if (index != -1) {
      if (e.target.value != "") {
        addLetterToShuffled(document.getElementById("shuffled"), e.target.value)
      }
      letters[index].remove()
      e.target.value = letter
    }
  }
}

function shuffleLetters(e) {
  e.preventDefault()
  let letters = Array.from(document.querySelectorAll("#shuffled span.letter")).map((x) => x.innerHTML)
  if (letters.length == 0) {
    letters = document.getElementById("fodder").value.split("")
  }
  const shuffled = document.getElementById("shuffled")
  shuffled.textContent = ""

  for (const letter of shuffleArray(letters)) {
    addLetterToShuffled(shuffled, letter)
  }
}

function addLetterToShuffled(shuffled, letter) {
  const element = document.createElement("span")
  element.className = "letter"
  const text = document.createTextNode(letter)
  element.appendChild(text)
  shuffled.appendChild(element)
}

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

init()
