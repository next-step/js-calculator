import { $ } from './selector.js'
import { isTargetInKeys } from './utils.js'
import { OPERATORS } from './constants.js'

function App() {
  let operations = []

  //prettier-ignore
  const updateDigit = ({ target: { textContent: digit } }) => {
  const totalDOM = $('[data-total]')
  const prevDigit = totalDOM.textContent
  const nextDigit = isTargetInKeys(OPERATORS, prevDigit) ?  parseInt(digit) : maxOfDigit(parseInt(prevDigit + digit))
  const isOperator = isTargetInKeys(OPERATORS, prevDigit) && prevDigit

  if (operations.length === 0) {
    addOperation(operations, nextDigit)
  }
  if (isOperator) {
    addOperation(operations, nextDigit)
  }
  if (!isOperator && parseInt(prevDigit) !== nextDigit) {
    operations[operations.length - 1] = nextDigit
  }
  
  totalDOM.textContent = operations[operations.length - 1]
}

  //prettier-ignore
  const resetDigit =  () => {
    $('[data-total]').textContent = 0
    operations.length = 0
}

  //prettier-ignore
  const updateOperation =  ({ target: { textContent: operation } }) => {
    const totalDOM = $('[data-total]')
    if (isTargetInKeys(OPERATORS, operation)) {
      addOperation(operations, operation)
      totalDOM.textContent = operations[operations.length - 1]
      return
    }
    if (operations.length <= 2) {
      operations.length = 0
      totalDOM.textContent = operations[0]
      return
    }
    const calculatedValue = OPERATORS[operations[1]](operations[0], operations[2])
    totalDOM.textContent = calculatedValue
    operations = [calculatedValue]
  }

  const maxOfDigit = (digit) => (digit > 1000 ? 999 : digit)

  const addOperation = (operations, operand) => {
    if (operations.length > 2) return
    operations.push(operand)
  }
  $('[data-digit]').addEventListener('click', updateDigit)
  $('[data-modifer]').addEventListener('click', resetDigit)
  $('[data-operations]').addEventListener('click', updateOperation)
}

App()
