import { default as Solution } from "/solution.js"

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

export default { update }
