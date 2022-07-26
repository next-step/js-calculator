import { setState } from './state.js'

const reset = () => {
  setState('input', '')
  setState('inputArr', [])
}

export { reset }
