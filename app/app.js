import { default as Enumeration } from "/enumeration.js"
import { default as Shuffled } from "/shuffled.js"
import { default as Utils } from "/utils.js"

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
