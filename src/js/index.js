import { $ } from './selector.js'
import { isTargetInKeys } from './utils.js'
import { OPERATORS } from './constants.js'

function App() {
  const state = {
    operations: [],
  }
  $('[data-digit]').addEventListener('click', updateDigit(state))
  $('[data-modifer]').addEventListener('click', resetDigit(state))
  $('[data-operations]').addEventListener('click', updateOperation(state))
}

//prettier-ignore
const updateDigit = ({ operations }) => ({ target: { textContent: digit } }) => {
  const totalDOM = $('[data-total]')
  const prevDigit = totalDOM.textContent
  const nextDigit = isTargetInKeys(OPERATORS, prevDigit) ?  Number(digit) : maxOfDigit(Number(prevDigit + digit))
  const isOperator = isTargetInKeys(OPERATORS, prevDigit) && prevDigit

  if (operations.length === 0) {
    addOperands(operations, nextDigit)
  }
  if (isOperator) {
    addOperands(operations, nextDigit)
  }
  if (!isOperator && Number(prevDigit) !== nextDigit) {
    operations[operations.length - 1] = nextDigit
  }

  totalDOM.textContent = operations[operations.length - 1]
}

//prettier-ignore
const resetDigit = ({ operations }) => () => {
    $('[data-total]').textContent = 0
    operations.length = 0
}

//prettier-ignore
const updateOperation = ({ operations }) => ({ target: { textContent: operation } }) => {
    const totalDOM = $('[data-total]')
    if (isTargetInKeys(OPERATORS, operation)) {
      addOperands(operations, operation)
      totalDOM.textContent = operations[operations.length - 1]
      return
    }
    if (operations.length <= 2) {
      operations.length = 0
      totalDOM.textContent = operations[0]
      return
    }
    totalDOM.textContent = maxOfDigit(OPERATORS[operations[1]](operations[0], operations[2]))
    operations.length = 0
  }

const maxOfDigit = (digit) => (digit > 1000 ? 999 : digit)

const addOperands = (operations, operand) => {
  if (operations.length > 2) return
  operations.push(operand)
}

App()
