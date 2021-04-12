import { Calculator } from './Calculator.js'
import { isLimitDigit, isContinuousOperator, isDuplicateOperator, calculateNumericalExpression } from './util.js'

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
        const newStr = this.state.totalNumber + e.target.innerText

        if (e.target.innerText === '=') {
          const result = calculateNumericalExpression(this.state.totalNumber)
          return result !== false && this.setState({ totalNumber: result })
        }

        if (isDuplicateOperator(newStr)) return
        if (isContinuousOperator(newStr)) return

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
