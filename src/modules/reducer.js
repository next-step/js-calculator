import { NONE } from '../constants/Display.js'
import { calculateDisplay, changeExpression } from '../utils/rework.js'
import {
  CALCULATE,
  RESET_DISPLAY,
  SET_EXPRESSION,
  SET_NUMBER,
} from './creator/index.js'

const initialState = {
  display: '0',
  digitCount: 0,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_DISPLAY:
      return {
        ...state,
        digitCount: 0,
        display: '0',
      }

    case SET_EXPRESSION:
      return {
        ...state,
        digitCount: 0,
        display: changeExpression(state, payload.expression),
      }

    case SET_NUMBER:
      return {
        ...state,
        digitCount: state.digitCount + 1,
        display:
          state.display === NONE
            ? payload.number
            : state.display + payload.number,
      }

    case CALCULATE:
      return {
        ...state,
        digitCount: 0,
        display: calculateDisplay(state.display),
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
