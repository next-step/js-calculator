import { Calculator } from './Calculator.js'
import { isRightNumericalExpression, parseNumericalExpression, isLimitDigit, isDuplicateOperator } from './util.js'

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
        const newStr = this.state.totalNumber + e.target.innerText

        if (this.state.totalNumber === '0' && e.target.innerText === '0') return
        if (isLimitDigit(newStr)) return

        this.setState({ totalNumber: this.state.totalNumber === '0' ? e.target.innerText : newStr })
      },
      onOperationsClick: (e) => {
        if (e.target.innerText === '=' && isRightNumericalExpression(this.state.totalNumber)) {
          return this.setState({ totalNumber: parseNumericalExpression(this.state.totalNumber) })
        }

        const newStr = this.state.totalNumber + e.target.innerText
        if (isDuplicateOperator(newStr)) return

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
