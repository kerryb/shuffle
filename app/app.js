function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => checkInput(e, /[\d,-]/))
  enumeration.addEventListener("change", updateEnumeration)

  const fodder = document.getElementById("fodder")
    fodder.addEventListener("beforeinput", (e) => checkInput(e, /[a-z]/i))
    fodder.addEventListener("input", upcaseInput)
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
    console.log(value)
    if (value == ",") {
      solution.append(" ")
    } else if (value == "-") {
      solution.append("-")
    } else {
      addSolutionWord(parseInt(value))
    }
  }
}

function addSolutionWord(letterCount) {
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

init()
