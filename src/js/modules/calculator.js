import { CALC_INPUT_TYPE } from '../constant'

export default class Calculator {
  constructor(props) {
    this.limit = props.limit
    this.x = ''
    this.y = ''
    this.operator = ''
  }

  validateInput(type) {
    if (!this.x) return type !== CALC_INPUT_TYPE.DIGIT ? false : true
    if (this.x.length === this.limit && !this.operator) return type !== CALC_INPUT_TYPE.OPERATION ? false : true
    if (this.operator && !this.y) return type !== CALC_INPUT_TYPE.DIGIT ? false : true
    if (this.y.length === this.limit) return false
    return true
  }

  setInput({ type, value }) {
    if (type === CALC_INPUT_TYPE.DIGIT) !this.operator ? (this.x += value) : (this.y += value)
    else this.operator = value
    return this
  }

  getResult() {
    if (!this.x || !this.y || !this.operator) return false
    return Math.floor(eval(`${this.x}${this.operator.replace('X', '*')}${this.y}`))
  }

  getCurrentState() {
    if (!this.x && !this.y && !this.operator) return 0
    return `${this.x}${this.operator}${this.y}`
  }

  resetState() {
    this.x = ''
    this.y = ''
    this.operator = ''
    return this
  }
}
