import { Calculator } from './Calculator.js'
import { ERR_MSG } from './constant.js'
import { isNotNumber, isLimitDigit, isContinuousOperator, isDuplicateOperator, isRightNumericalExpression, parseNumericalExpression, convertZeroZero } from './util.js'

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
        if (rawStr === '0' || isNotNumber(rawStr)) return this.setState({ rawStr: digitChar })

        const newStr = convertZeroZero(rawStr + digitChar)
        if (isLimitDigit(newStr)) return alert(ERR_MSG.MAX_DIGIT_THREE)

        this.setState({ rawStr: newStr })
      },
      onOperationsClick: ({ target: { innerText: operatorChar } }) => {
        const rawStr = this.state.rawStr

        if (operatorChar === '=') return isRightNumericalExpression(rawStr) ? this.setState({ rawStr: parseNumericalExpression(rawStr) }) : alert('올바른 수식 입력')

        const newStr = rawStr + operatorChar

        if (isNotNumber(rawStr)) return alert(ERR_MSG.RESTART_NUMERICAL_EXPRESSION)
        if (isDuplicateOperator(newStr)) return alert(ERR_MSG.MAX_OPERATOR_ONE)
        if (isContinuousOperator(newStr)) return alert(ERR_MSG.CONTINUOUS_OPERATOR_ONE)

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
