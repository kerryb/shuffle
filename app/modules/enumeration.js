import { default as Solution } from "/modules/solution.js"
import { default as Utils } from "/modules/utils.js"

function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => Utils.restrictInput(e, /[\d,-]/))
  enumeration.addEventListener("change", update)
}

function update(e) {
  e.target.reportValidity()
  if (e.target.validity.valid) {
    const fodder = document.getElementById("fodder")
    fodder.value = ""
    fodder.maxLength = letterCount(e.target.value)
    Solution.addInputs(e.target.value)
    document.getElementById("shuffled").textContent = ""
  }
}

function letterCount(enumeration) {
  return enumeration.split(/[,-]/).map((n) => parseInt(n)).reduce((a, b) => a + b)
}

export default { init, update }
