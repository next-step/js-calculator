import { Calculator } from './Calculator.js'
import { calculate } from './util.js'

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

        this.setState({ totalNumber: this.state.totalNumber === '0' ? e.target.innerText : this.state.totalNumber + e.target.innerText })
      },
      onOperationsClick: (e) => {
        const regEual = /-?[0-9]+([+/X-])[0-9]+/gim

        if (e.target.innerText === '=' && regEual.test(this.state.totalNumber)) {
          return
        }

        const newStr = this.state.totalNumber + e.target.innerText
        const reg = /-?[0-9]+[+/X-]/gim

        if (!reg.test(newStr)) return

        this.setState({ totalNumber: newStr })
      },
    })
  }

  this.setState = (newState) => {
    this.state = newState
    this.calculator.setState(this.state)
  }

  init()
}
