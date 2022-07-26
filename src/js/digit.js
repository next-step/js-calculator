import { state, setState } from './state.js'
import { render } from './index.js'

const isLastValueOperation = () => Number.isNaN(Number(state.inputArr.at(-1)))
const isInputArrayZero = () => Number(state.inputArr.join(''))
const isInputLengthMax = () => state.input.length === 3

const checkValidate = () => {
  if (isInputLengthMax()) {
    alert('숫자는 세 자리까지만 입력 가능합니다!')
    return true
  }

  return false
}

const setInputArr = () => {
  const newState = [...state.inputArr]

  if (isLastValueOperation()) {
    newState[isInputArrayZero() ? 0 : state.inputArr.length] = state.input
  } else {
    newState[state.inputArr.length - 1] = state.input
  }

  setState('inputArr', newState)
}

const makeDigit = (event) => {
  const { innerText: digit } = event.target

  if (isLastValueOperation()) {
    setState('input', '')
  }

  if (checkValidate()) {
    return
  }

  const digits = state.input + digit

  setState('input', digits)
  setInputArr()

  render()
}

export { makeDigit }
