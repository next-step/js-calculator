import { Operators, OperatorSet, NumberSet, ErrorMessages } from './constants.js'

const calculateFunctions = {
  [Operators.Add]: (operand1, operand2) => operand1 + operand2,
  [Operators.Subtract]: (operand1, operand2) => operand1 - operand2,
  [Operators.Multiply]: (operand1, operand2) => operand1 * operand2,
  [Operators.Divide]: (operand1, operand2) => {
    if (operand2 === 0) throw new Error(ErrorMessages.DivideZero)
    return Math.trunc(operand1 / operand2)
  },
}

const isNumber = val => NumberSet.has(val)
const isOperator = val => OperatorSet.has(val)

export default class Calculator {
  #values = ['0']

  get #lastOperatorIndex() {
    for (let i = this.#values.length - 1; i >= 0; i--) {
      const val = this.#values[i]
      if (OperatorSet.has(val)) return i
    }
    return -1
  }
  get #isNegative() {
    return this.#values[this.#lastOperatorIndex] === '-'
  }
  get #prevValueSize() {
    return this.#values.length - (this.#lastOperatorIndex + 1)
  }
  #removeFirstZero() {
    if (
      (!this.#isNegative && this.#values.length === 1 && this.#values[0] === '0') ||
      (this.#isNegative && this.#values.length === 2 && this.#values[1] === '0') ||
      (this.#values.length === this.#lastOperatorIndex + 2 && this.#values[this.#lastOperatorIndex + 1] === '0')
    ) {
      this.#values.pop()
    }
  }
  #calculate() {
    const operator = this.#values[this.#lastOperatorIndex]
    const operand1 = this.#values.slice(0, this.#lastOperatorIndex).join('')
    const operand2 = this.#values.slice(this.#lastOperatorIndex + 1).join('')

    if (!operator || !calculateFunctions[operator]) throw new Error(ErrorMessages.Operator)

    const [nOperand1, nOperand2] = [+operand1, +operand2]
    if (!Number.isInteger(nOperand1) || !Number.isInteger(nOperand2)) throw new Error(ErrorMessages.Operand)

    const res = calculateFunctions[operator](nOperand1, nOperand2)
    if (!Number.isInteger(res)) throw new Error(ErrorMessages.Result)

    this.#values = (res + '').split('')
    return true
  }
  #executeDigit(val) {
    if (!isNumber(val)) throw new Error(ErrorMessages.NoNumber)
    this.#removeFirstZero()
    const isNegative = this.#isNegative
    const prevSize = this.#prevValueSize
    if ((isNegative && prevSize >= 4) || prevSize >= 3) {
      throw new Error(ErrorMessages.MaxDigits)
    }
    this.#values.push(val)
    return true
  }
  #executeOperation(val) {
    if (!isOperator(val)) throw new Error(ErrorMessages.NoOperator)
    this.#removeFirstZero()
    if (val === Operators.Equal) {
      return this.#calculate()
    }
    if (this.#values.length > 0 && this.#lastOperatorIndex === this.#values.length - 1) {
      this.#values[this.#values.length - 1] = val
      return true
    }
    if (this.#lastOperatorIndex > -1) this.#calculate()
    this.#values.push(val)
    return true
  }
  #executeModifier() {
    this.#values = ['0']
    return true
  }
  execute(val, type) {
    switch (type) {
      case 'digit':
        return this.#executeDigit(val)
      case 'operation':
        return this.#executeOperation(val)
      case 'modifier':
        return this.#executeModifier()
      default:
        return false
    }
  }
  get state() {
    return this.#values.join('')
  }
}
