import { Calculator } from './Calculator.js'
import { isRightNumericalExpression, parseNumericalExpression, isLimitDigit } from './util.js'

export function App($app) {
  const init = () => {
    this.$calculatorDom = document.createElement('div')
    this.$calculatorDom.classList.add('calculator')
    $app.appendChild(this.$calculatorDom)

    this.state = {
      firstNumber: '0',
      secondNumber: '0',
      totalNumber: '0',
    }

    this.calculator = new Calculator({
      $calculatorDom: this.$calculatorDom,
      initState: this.state,
      onDigitsClick: (e) => {
        if (this.state.totalNumber === '0' && e.target.innerText === '0') return
        if (isLimitDigit(this.state.totalNumber + e.target.innerText)) return

        this.setState({ totalNumber: this.state.totalNumber === '0' ? e.target.innerText : this.state.totalNumber + e.target.innerText })
      },
      onOperationsClick: (e) => {
        if (e.target.innerText === '=' && isRightNumericalExpression(this.state.totalNumber)) {
          return this.setState({ totalNumber: parseNumericalExpression(this.state.totalNumber) })
        }

        const newStr = this.state.totalNumber + e.target.innerText
        const reg = /-?[0-9]+[+/X-]/gim

        if (!reg.test(newStr)) return

        this.setState({ totalNumber: newStr })
      },
      onAcClick: (e) => {
        this.setState({ totalNumber: '0' })
      },
    })
  }

  this.setState = (newState) => {
    this.state = newState
    this.calculator.setState(this.state)
  }

  init()
}
