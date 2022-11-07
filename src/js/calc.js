export class Calc {
  constructor() {
    this.x = ''
    this.y = ''
    this.operator = ''
  }

  #isSetOperator() {
    // 처음에는 숫자
    if (!this.x) return window.alert('처음엔 숫자를 입력해주세요.')

    // 연속 연산자는 안됨
    if (this.operator) return window.alert('연산자 다음엔 숫자를 입력해주세요.')
  }

  #isSetNumber() {
    // x 3자리수 확인
    if (this.x.length > 2 && !this.operator) return window.alert('숫자는 세자리수까지 입력 가능합니다.')

    // y 3자리수 확인
    if (this.y.length > 2 && this.operator) return window.alert('숫자는 세자리수까지 입력 가능합니다.')
  }

  setNum(number) {
    this.#isSetNumber()
    if (this.x.length < 2) return (this.x += number)

    this.y += number
  }

  add() {
    this.#isSetOperator()
    this.operator = '+'
  }

  subtract() {
    this.#isSetOperator()
    this.operator = '-'
  }

  multiply() {
    this.#isSetOperator()
    this.operator = '*'
  }

  divide() {
    this.#isSetOperator()
    this.operator = '/'
  }

  getResult() {
    if (!this.x || !this.y || !this.operator) return window.alert('두개의 숫자와 한개의 연산자를 입력해주세요.')
    if (this.operator === '+') return +this.x + +this.y
    if (this.operator === '-') return +this.x - +this.y
    if (this.operator === '*') return +this.x * +this.y
    if (this.operator === '/') return (+this.x / +this.y).toFixed(3)
  }

  resetState() {
    this.x = ''
    this.y = ''
    this.operator = ''
  }
}
