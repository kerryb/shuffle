document.getElementById("enumeration").addEventListener("change", enumerationChanged)

function enumerationChanged(e) {
  e.target.reportValidity()
  if (e.target.validity.valid) {
    const solution = document.getElementById("solution")
    solution.innerHTML = ""

    for (const value of e.target.value.split(/([,-])/)) {
      console.log(value)
      if (value == ",") {
        solution.append(" ")
      } else if (value == "-") {
        solution.append("-")
      } else {
        for (let n = 0; n < parseInt(value); n++) {
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
    }
  }
}
