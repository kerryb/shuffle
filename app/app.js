import { default as Enumeration } from "/enumeration.js"
import { default as Shuffled } from "/shuffled.js"

function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => restrictInput(e, /[\d,-]/))
  enumeration.addEventListener("change", Enumeration.update)

  const fodder = document.getElementById("fodder")
  fodder.addEventListener("beforeinput", (e) => restrictInput(e, /[a-z]/i))
  fodder.addEventListener("input", upcaseInput)

  const form = document.getElementById("form")
  form.addEventListener("submit", Shuffled.shuffleLetters)
}

function restrictInput(e, pattern) {
  if (e.inputType == "insertText" && !pattern.test(e.data)) {
    e.preventDefault()
  }
}

function upcaseInput(e) {
  e.target.value = e.target.value.toUpperCase()
}

init()
