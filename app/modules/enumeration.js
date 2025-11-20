import { default as Fodder } from "/modules/fodder.js"
import { default as Shuffled } from "/modules/shuffled.js"
import { default as Solution } from "/modules/solution.js"
import { default as Utils } from "/modules/utils.js"

function init() {
  const enumeration = element()
  enumeration.addEventListener("beforeinput", (event) => Utils.restrictInput(event, /[\d,-]/))
  enumeration.addEventListener("change", updateIfValid)
}

function element() {
  return document.getElementById("enumeration")
}

function updateIfValid(event) {
  event.target.reportValidity()
  if (event.target.validity.valid) {
    update(event.target.value)
  }
}

function update(value) {
  Fodder.update(value)
  Solution.addInputs(value)
  Shuffled.clear()
}

export default { init, update }
