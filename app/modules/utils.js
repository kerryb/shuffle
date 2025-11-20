function restrictInput(e, pattern) {
  if (e.inputType == "insertText" && !pattern.test(e.data)) {
    e.preventDefault()
  }
}

function upcaseInput(e) {
  e.target.value = e.target.value.toUpperCase()
}

export default { restrictInput, upcaseInput }
