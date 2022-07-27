import { setState } from './state.js'
import { render } from './index.js'

const reset = () => {
  setState('input', '')
  setState('inputArr', ['0'])

  render()
}

export { reset }
