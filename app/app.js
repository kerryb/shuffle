import { default as Enumeration } from "/modules/enumeration.js"
import { default as Shuffled } from "/modules/shuffled.js"
import { default as Utils } from "/modules/utils.js"

function init() {
  const enumeration = document.getElementById("enumeration")
  enumeration.addEventListener("beforeinput", (e) => Utils.restrictInput(e, /[\d,-]/))
  enumeration.addEventListener("change", Enumeration.update)

  const fodder = document.getElementById("fodder")
  fodder.addEventListener("beforeinput", (e) => Utils.restrictInput(e, /[a-z]/i))
  fodder.addEventListener("input", Utils.upcaseInput)

  const form = document.getElementById("form")
  form.addEventListener("submit", Shuffled.shuffleLetters)
}

init()
