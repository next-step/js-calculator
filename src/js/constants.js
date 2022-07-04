export const DIGIT_LENGTH_LIMIT = 3;
export const INITIAL_VALUE = '0';

export const OPERATOR_REGEXP = new RegExp(/([+|\-|X|/])/g);

export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  EQUAL: '=',
};

export const OPERATION_EXECUTOR = {
  [OPERATORS.ADD]: (a, b) => Number(a) + Number(b),
  [OPERATORS.SUBTRACT]: (a, b) => Number(a) - Number(b),
  [OPERATORS.MULTIPLY]: (a, b) => Number(a) * Number(b),
  [OPERATORS.DIVIDE]: (a, b) => Math.floor(a / b),
};
