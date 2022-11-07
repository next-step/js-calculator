import '../css/index.css'
import { Calc } from './calc.js'

const calculate = new Calc()

const digitList = document.getElementsByClassName('digit')
const add = document.getElementById('add')
const subtract = document.getElementById('subtract')
const multiplication = document.getElementById('multiplication')
const division = document.getElementById('division')
const operate = document.getElementById('operate')
const modifier = document.getElementsByClassName('modifier')

Array.from(digitList).forEach((digit) =>
  digit.addEventListener('click', () => {
    calculate.setNum(digit.innerText)
  })
)
add.addEventListener('click', () => calculate.add())
subtract.addEventListener('click', () => calculate.subtract())
multiplication.addEventListener('click', () => calculate.multiply())
division.addEventListener('click', () => calculate.divide())
operate.addEventListener('click', () => console.log(calculate.getResult()))
modifier[0].addEventListener('click', () => calculate.resetState())
