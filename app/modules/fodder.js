import { default as Shuffled } from "/modules/shuffled.js"
import { default as Utils } from "/modules/utils.js"

function init() {
  const fodder = document.getElementById("fodder")
  fodder.addEventListener("beforeinput", (event) => Utils.restrictInput(event, /[a-z]/i))
  fodder.addEventListener("input", Utils.upcaseInput)

  const form = document.getElementById("form")
  form.addEventListener("submit", Shuffled.shuffleLetters)
}

function element() {
  return document.getElementById("fodder")
}

function update(value) {
  const fodder = element()
  fodder.value = ""
  fodder.maxLength = letterCount(value)
}

function letterCount(enumeration) {
  return enumeration.split(/[,-]/).map((n) => parseInt(n)).reduce((a, b) => a + b)
}

export default { init, element, update }
