document.getElementById("enumeration").addEventListener("change", enumerationChanged)

function enumerationChanged(e) {
  e.target.reportValidity()
  if (e.target.validity.valid) {
    const solution = document.getElementById("solution")
    solution.innerHTML = ""

    const iterator = e.target.value[Symbol.iterator]()
    let char = iterator.next()
    while (!char.done) {
      if (char.value == "/") {
        solution.append(" ")
      } else if (char.value == "/" || char.value == "-") {
        solution.append("-")
      } else {
        for (let n = 0; n < parseInt(char.value); n++) {
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
      char = iterator.next()
    }
  }
}
