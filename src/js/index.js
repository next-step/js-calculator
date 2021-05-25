const operations = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  'X': (a, b) => Number(a) * Number(b),
  '/': (a, b) => Math.floor(Number(a) / Number(b)),
}

const OPERATORS = ['/', 'X', '-', '+'];

const NUMBER_LENGTH_LIMIT = 3;

class Calculator {
  constructor (app) {
    this.$total = app.querySelector('#total')
    this.$digit = app.querySelector('div.digits')
    this.$modifier = app.querySelector('div.modifiers')
    this.$operation = app.querySelector('div.operations')
    this._addDomEvent()
  }

  _addDomEvent () {
    this.$digit.addEventListener('click', this._handleDigit)
    this.$modifier.addEventListener('click', this._clearPanel)
    this.$operation.addEventListener('click', this._handleOperation)
  }

  _handleDigit = ({ target }) => {
    if (!this._isValidLength()) {
      return alert('숫자는 세 자리까지만 입력 가능합니다!')
    }
    if (this.$total.innerText === '0') {
      return (this.$total.innerText = target.innerText)
    }
    return (this.$total.innerText += target.innerText)
  }

  _isValidLength = () => {
    const displayValue = this.$total.innerText
    const operator = this._getOperator()

    if (!operator) {
      return displayValue.length < 3
    }
    return displayValue.split(operator)[1].length < NUMBER_LENGTH_LIMIT
  }

  _clearPanel = () => {
    this.$total.innerText = 0
  }

  _handleOperation = ({target}) => {
    const operateValue = target.innerText
    const operator = this._getOperator()
    const total = this.$total.innerText
    if (!operator && operateValue === '=') return false

    const isValidTotalValue = (total === '0' || isNaN(total[total.length - 1]))
    if (isValidTotalValue) {
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

  _getOperator () {
    const displayValue = this.$total.innerText
    return displayValue.split('').find((v) => OPERATORS.includes(v))
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Calculator(document.querySelector('#app'))
});
