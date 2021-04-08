const operations = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  'X': (a, b) => Number(a) * Number(b),
  '/': (a, b) => Math.floor(Number(a) / Number(b)),
}

const OPERATORS = ['/', 'X', '-', '+']

class App {
  constructor (app) {
    this.$total = app.querySelector('#total')
    this.$digit = app.querySelector('div.digits')
    this.$modifier = app.querySelector('div.modifiers')
    this.$operation = app.querySelector('div.operations')
    this.addDomEvent()
  }

  addDomEvent () {
    this.$digit.addEventListener('click', this.handleDigit)
    this.$modifier.addEventListener('click', this.handleModifier)
    this.$operation.addEventListener('click', this.handleOperation)
  }

  handleDigit = ({ target }) => {
    if (!this.isValidLength()) {
      return alert('숫자는 세 자리까지만 입력 가능합니다!')
    }
    if (this.$total.innerText === '0') {
      return (this.$total.innerText = target.innerText)
    }
    return (this.$total.innerText += target.innerText)
  }

  isValidLength = () => {
    const displayValue = this.$total.innerText
    const operator = displayValue.split('').find((v) => OPERATORS.includes(v))

    if (!operator) {
      return displayValue.length < 3
    }
    return displayValue.split(operator)[1].length < 3
  }

  handleModifier = () => {
    this.$total.innerText = 0
  }

  handleOperation = ({target}) => {
    const operateValue = target.innerText
    const displayValue = this.$total.innerText
    const operator = displayValue.split('').find((v) => OPERATORS.includes(v))
    const total = this.$total.innerText
    if (!operator && operateValue === '=') {
      return false
    }

    if (total === '0' || isNaN(total[total.length - 1])) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
      return false
    }

    if (operateValue === '=') {
      const [first = 0, second = 0] = total.split(operator)
      this.$total.innerText = operations[operator](first, second)
      return false
    }

    this.$total.innerText += operateValue

  }

}

new App(document.querySelector('#app'))
