import '../css/index.css'
import { Calc } from './calc.js'

const calculate = new Calc()

const digitList = document.getElementsByClassName('digit')
const operationList = document.getElementsByClassName('operation')
const modifier = document.getElementsByClassName('modifier')
const display = document.getElementById('total')
const updateDisplay = (type) => {
  if (type === 'result') return (display.innerHTML = calculate.getResult() || calculate.getCurrentState())
  if (type === 'progress') return (display.innerHTML = calculate.getCurrentState())
  if (type === 'reset') display.innerHTML = 0
}

Array.from(digitList).forEach((digit) =>
  digit.addEventListener('click', () => {
    calculate.setNum(digit.innerText)
    updateDisplay('progress')
  })
)

Array.from(operationList).forEach((operation) =>
  operation.addEventListener('click', () => {
    if (operation.innerText === '=') updateDisplay('result')
    else {
      calculate.setOperator(operation.innerText)
      updateDisplay('progress')
    }
  })
)

modifier[0].addEventListener('click', () => {
  calculate.resetState()
  updateDisplay('reset')
})
