import { calculate } from '..'
import { CALC_ERROR_MESSAGE, CALC_INPUT_TYPE, OPERATION_TYPE } from '../constant'
import { updateDisplay } from './util'

const handler = {
  digit: (e) => {
    calculate.validateInput(CALC_INPUT_TYPE.DIGIT)
      ? updateDisplay(calculate.setInput({ type: CALC_INPUT_TYPE.DIGIT, value: e.target.innerText }).getCurrentState())
      : window.alert(CALC_ERROR_MESSAGE.LIMIT)
  },

  operation: (e) => {
    if (e.target.innerText !== OPERATION_TYPE.EQUAL)
      calculate.validateInput(CALC_INPUT_TYPE.OPERATION)
        ? updateDisplay(
            calculate
              .setInput({
                type: CALC_INPUT_TYPE.OPERATION,
                value: e.target.innerText,
              })
              .getCurrentState()
          )
        : window.alert(CALC_ERROR_MESSAGE.DISABLE_OPERATION)
    else updateDisplay(calculate.getResult()) || window.alert(CALC_ERROR_MESSAGE.DISABLE_RESULT)
  },

  modifier: () => updateDisplay(calculate.resetState().getCurrentState()),
}

export default handler
