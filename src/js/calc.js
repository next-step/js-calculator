export class Calc {
  constructor() {
    this.x = ''
    this.y = ''
    this.operator = ''
  }

  #isSetOperator() {
    if (!this.x) return window.alert('처음엔 숫자를 입력해주세요.')

    if (this.operator) return window.alert('연산자 다음엔 숫자를 입력해주세요.')
  }

  #isSetNumber() {
    if (this.x.length < 3 && !this.operator) return true

    if (this.y.length < 3 && this.operator) return true
  }

  setNum(number) {
    if (!this.operator) this.#isSetNumber() ? (this.x += number) : window.alert('숫자는 세자리수까지 입력 가능합니다.')
    else this.#isSetNumber() ? (this.y += number) : window.alert('숫자는 세자리수까지 입력 가능합니다.')
  }

  setOperator(operator) {
    this.#isSetOperator()
    this.operator = operator
  }

  getResult() {
    if (!this.x || !this.y || !this.operator) return window.alert('두개의 숫자와 한개의 연산자를 입력해주세요.')
    if (this.operator === '+') return +this.x + +this.y
    if (this.operator === '-') return +this.x - +this.y
    if (this.operator === 'X') return +this.x * +this.y
    if (this.operator === '/') return Math.floor(+this.x / +this.y)
  }

  getCurrentState() {
    return `${this.x}${this.operator}${this.y}`
  }

  resetState() {
    this.x = ''
    this.y = ''
    this.operator = ''
  }
}
