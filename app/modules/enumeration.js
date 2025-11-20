import { default as Solution } from "/modules/solution.js"
import { default as Utils } from "/modules/utils.js"

function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (event) => Utils.restrictInput(event, /[\d,-]/))
  enumeration.addEventListener("change", updateIfValid)
}

function updateIfValid(event) {
  event.target.reportValidity()
  if (event.target.validity.valid) {
    update(event.target.value)
  }
}

function update(value) {
  const fodder = document.getElementById("fodder")
  fodder.value = ""
  fodder.maxLength = letterCount(value)
  Solution.addInputs(value)
  document.getElementById("shuffled").textContent = ""
}

function letterCount(enumeration) {
  return enumeration.split(/[,-]/).map((n) => parseInt(n)).reduce((a, b) => a + b)
}

export default { init, update }
