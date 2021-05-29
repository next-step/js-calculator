import { $, operation } from '../utils/utils.js'

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
  display === '0' ? total.innerText = digit : total.innerText += digit
}

const init = () => {
  console.log('init calculator using cypress!')
  addEvent({ el: digits, type: 'click', callback: clickDigit })
  addEvent({ el: operations, type: 'click', callback: clickOperation })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})