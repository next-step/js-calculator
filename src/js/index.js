import { $ } from './selector.js'
import { isTargetInKeys } from './utils.js'
import { OPERATORS } from './constants.js'

function App() {
  const state = {
    operands: [],
  }
  $('[data-digit]').addEventListener('click', updateDigit(state))
  $('[data-modifer]').addEventListener('click', resetDigit(state))
  $('[data-operations]').addEventListener('click', updateOperation(state))
}

//prettier-ignore
const updateDigit = ({ operands }) => ({ target: { textContent: digit } }) => {
  const totalDOM = $('[data-total]')
  const prevDigit = totalDOM.textContent
  const nextDigit = isTargetInKeys(OPERATORS, prevDigit) ?  Number(digit) : maxOfDigit(Number(prevDigit + digit))
  const isOperator = isTargetInKeys(OPERATORS, prevDigit) && prevDigit

  if (operands.length === 0) {
    addOperands(operands, nextDigit)
  }
  if (isOperator) {
    addOperands(operands, nextDigit)
  }
  if (!isOperator && Number(prevDigit) !== nextDigit) {
    operands[operands.length - 1] = nextDigit
  }

  totalDOM.textContent = operands[operands.length - 1]
}

//prettier-ignore
const resetDigit = ({ operands }) => () => {
    $('[data-total]').textContent = 0
    operands.length = 0
}

//prettier-ignore
const updateOperation = ({ operands }) => ({ target: { textContent: operation } }) => {
    const totalDOM = $('[data-total]')
    if (isTargetInKeys(OPERATORS, operation)) {
      addOperands(operands, operation)
      totalDOM.textContent = operands[operands.length - 1]
      return
    }
    if (operands.length <= 2) {
      operands.length = 0
      totalDOM.textContent = operands[0]
      return
    }
    totalDOM.textContent = maxOfDigit(OPERATORS[operands[1]](operands[0], operands[2]))
    operands.length = 0
  }

const maxOfDigit = (digit) => (digit > 1000 ? 999 : digit)

const addOperands = (operands, operand) => {
  if (operands.length > 2) return
  operands.push(operand)
}

App()
