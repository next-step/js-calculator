import { $ } from "./helper.js"
import { ERROR_TEXT } from "./constants.js"

export const calculator = (() => {
  let stack = []
  const total = $.get("#total")

  const printTotal = () => {
    if (stack.length === 0) {
      total.innerHTML = 0
    } else {
      total.innerHTML = stack.join("")
    }
  }

  const calculate = () => {
    stack = [Math.floor(eval(stack.join("").replace(/X/g, "*")))]
  }

  return {
    pushDigit: (digit) => {
      const lastEl = stack[stack.length - 1]
      if (isNaN(lastEl)) {
        stack.push(digit)
      } else {
        if (lastEl.length > 2) {
          alert(ERROR_TEXT.DIGIT_LENGTH)
        } else {
          stack[stack.length - 1] = lastEl + digit
        }
      }
      printTotal()
    },

    pushOperation: (operation) => {
      const lastEl = stack[stack.length - 1]
      if (isNaN(lastEl)) {
        return alert(ERROR_TEXT.OPERATION_INVALID_LOCATION)
      }
      if (operation === "=") {
        calculate()
      } else {
        stack.push(operation)
      }
      printTotal()
    },

    clear: () => {
      stack = []
      printTotal()
    },
  }
})()
