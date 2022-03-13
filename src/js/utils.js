import {
  OPERATION,
  MESSAGE,
  EMPTY_STRING,
  MAX_INPUT_LENGTH,
} from './constants.js';

export const mathOperations = {
  [OPERATION.PLUS]: (a, b) => a + b,
  [OPERATION.MINUS]: (a, b) => a - b,
  [OPERATION.MULTIPLY]: (a, b) => a * b,
  [OPERATION.DIVIDE]: (a, b) => Math.trunc(a / b),
};

export const validateInputs = (a, b) => {
  if (a === EMPTY_STRING || b === EMPTY_STRING) {
    return {
      result: false,
      message: MESSAGE.INVALID_INPUT,
    };
  }

  return {
    result: true,
  };
};

export const validateInputLength = input => {
  if (input.length >= MAX_INPUT_LENGTH) {
    return false;
  }

  return true;
};
