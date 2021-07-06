import createAction from '../../core/Redux/createAction.js'
import {
  SET_EXPRESSION,
  RESET_DISPLAY,
  SET_NUMBER,
  CALCULATE,
} from '../creator/creator.js'

const resetDisplay = () => createAction(RESET_DISPLAY)
const setExpression = (expression) =>
  createAction(SET_EXPRESSION, { expression })

const setNumber = (number) => createAction(SET_NUMBER, { number })
const calculate = () => createAction(CALCULATE)

export { resetDisplay, setExpression, setNumber, calculate }
