import { Calculator } from './Calculator.js'

export function App($app) {
  const init = () => {
    this.$calculatorDom = document.createElement('div')
    this.$calculatorDom.classList.add('calculator')
    $app.appendChild(this.$calculatorDom)

    this.state = {
      firstNumber: 0,
      secondNumber: 0,
      totalNumber: 0,
    }

    this.calculator = new Calculator({ $calculatorDom: this.$calculatorDom, initState: this.state })
  }

  this.setState = (newState) => {
    this.state = newState
    this.calculator.setState(this.state)
  }

  init()
}
