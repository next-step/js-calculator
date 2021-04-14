import { Calculator } from './Calculator.js'
import { isLimitDigit, isContinuousOperator, isDuplicateOperator, isRightNumericalExpression, parseNumericalExpression, convertZeroZero } from './util.js'

export function App($app) {
  const init = () => {
    const $calculatorDom = document.createElement('div')
    $calculatorDom.classList.add('calculator')
    $app.appendChild($calculatorDom)

    this.state = {
      rawStr: '0',
    }

    this.calculator = new Calculator({
      $calculatorDom,
      initState: this.state,
      onDigitsClick: ({ target: { innerText: digitChar } }) => {
        const rawStr = this.state.rawStr
        if (rawStr === '0') return this.setState({ rawStr: digitChar })

        const newStr = convertZeroZero(rawStr + digitChar)
        if (isLimitDigit(newStr)) return alert('숫자는 세 자리까지만 입력 가능합니다!')

        this.setState({ rawStr: newStr })
      },
      onOperationsClick: ({ target: { innerText: operatorChar } }) => {
        const rawStr = this.state.rawStr

        if (operatorChar === '=') return isRightNumericalExpression(rawStr) ? this.setState({ rawStr: parseNumericalExpression(rawStr) }) : alert('올바른 수식 입력')

        const newStr = rawStr + operatorChar

        if (isDuplicateOperator(newStr)) return alert('연산자는 한개만 가능')
        if (isContinuousOperator(newStr)) return alert('연산자는 연속해서 입력 불가')

        this.setState({ rawStr: newStr })
      },
      onAcClick: (e) => {
        this.setState({ rawStr: '0' })
      },
    })
  }

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState }
    this.calculator.setState(this.state)
  }

  init()
}
