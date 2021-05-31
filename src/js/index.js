import { $, operation, MESSAGE } from '../utils/utils.js'

const total = $('#total')
const digits = $('.digits')
const modifier = $('.modifier')
const operations = $('.operations')

const addEvent = ({ el, type, callback }) => {
  el.addEventListener(type, callback)
}

const calculator = ({ operationArray, numberArray }) => {
  let number = numberArray.shift()
  while (numberArray.length > 0) {
    const operator = operationArray.shift()
    number = operation[operator](number, numberArray.shift())
  }
  total.innerText = number
}

const checkDigits= (digits) => {
  return digits.split(/[+/X-]/).pop().length >= 3 ? true : false
}

const splitExpression = (expression) => {
  const operationArray = expression.split('').filter(item => Object.keys(operation).includes(item))
  const numberArray = expression.split(/[+/X-]/)
  calculator({ operationArray, numberArray })
}

const clickOperation = ({ target: el }) => {
  const operation = el.innerText
  const display = total.innerText
  if (operation === '=') {
    splitExpression(display)
    return
  }
  display === '0' ? total.innerText = digit : total.innerText += operation
}

const clickDigit = ({ target: el }) => {
  const digit = el.innerText
  const display = total.innerText
  if (checkDigits(display)) {
    alert(MESSAGE.DIGITS_ALERT_MESSAGE)
    return
  }
  display === '0' ? total.innerText = digit : total.innerText += digit
}

const clickAllClear = () => {
  total.innerText = '0'
}

const init = () => {
  console.log('init calculator using cypress!')
  addEvent({ el: digits, type: 'click', callback: clickDigit })
  addEvent({ el: operations, type: 'click', callback: clickOperation })
  addEvent({ el: modifier, type: 'click', callback: clickAllClear })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})