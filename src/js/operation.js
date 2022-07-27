import { state, setState } from './state.js'
import { render } from './index.js'

const checkValidate = () => {
  if (!state.inputArr.at(-1) || Number.isNaN(Number(state.inputArr.at(-1)))) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
    return true
  }

  return false
}

const doCalculate = () => {
  const [num1, OPERATION, num2] = state.inputArr
  const [number1, number2] = [num1, num2].map(Number)

  let result = 0

  switch (true) {
    case OPERATION === '+':
      result = number1 + number2
      break

    case OPERATION === '-':
      result = number1 - number2
      break

    case OPERATION === 'X':
      result = number1 * number2
      break

    case OPERATION === '/':
      result = Number(number1 / number2).toFixed(0)
      break
  }

  setState('inputArr', [result])

  render()
}

const setOperation = (operation) => {
  const newInputArr = [...state.inputArr]
  const index = newInputArr.length === 0 ? 0 : newInputArr.length

  newInputArr[index] = operation

  setState('inputArr', newInputArr)

  render()
}

const makeOperation = (event) => {
  const { innerText: OPERATION } = event.target

  if (checkValidate()) {
    return
  }

  switch (true) {
    case OPERATION === '=':
      doCalculate()
      break
    default:
      setOperation(OPERATION)
      break
  }
}

export { makeOperation }
