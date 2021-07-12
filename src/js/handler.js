import { $ } from "./helper.js"
import { calculator } from "./calculator.js"

const digitArr = $.getAll(".digit")
digitArr.forEach((digit) => {
  digit.onclick = () => calculator.pushDigit(digit.innerHTML)
})

const operationArr = $.getAll(".operation")
operationArr.forEach((operation) => {
  operation.onclick = () => calculator.pushOperation(operation.innerHTML)
})

const modifier = $.get(".modifier")
modifier.onclick = () => calculator.clear()
