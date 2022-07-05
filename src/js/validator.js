import { MAX_INPUT_NUMBER_LENGTH } from './constants.js';
import { mergeState, operatorRegex }from './lib.js'

export function digitValidator(state) {
  const target = mergeState(state).split(operatorRegex).slice(-1)[0]; // Last

  if (target && target.length >= MAX_INPUT_NUMBER_LENGTH) {
    return {
      isValid: false,
      msg: '숫자는 3자리를 넘을 수 없습니다.'
    }
  }
  return { isValid: true }
}

export function calculateValidator(state) {
  const [num1, num2] = mergeState(state).split(operatorRegex);
  if(!num1) {
    return {
      isValid: false,
      msg: '숫자를 먼저 입력해야 합니다(첫번째 숫자).'
    }
  }
  if(!num2) {
    return {
      isValid: false,
      msg: '숫자를 먼저 입력해야 합니다(두번째 숫자).'
    }
  }
  return { isValid: true }
}

export function operatorValidator(state, value) {
  const isStateEmpty = !state.length;
  if (isStateEmpty) {
    return {
      isValid: false,
      msg: '숫자를 먼저 입력해야 합니다.'
    }
  }

  const isOperatorExist = state.includes(value);
  if (isOperatorExist) {
    return {
      isValid: false,
      msg: '숫자를 먼저 입력해야 합니다.'
    }
  }
  return { isValid: true }
}