export const ADD_OPERATOR = '+';
export const SUBTRACT_OPERATOR = '-';
export const POW_OPERATOR = 'X';
export const DIVIDE_OPERATOR = '/';

export const OPERATORS = [
  ADD_OPERATOR,
  SUBTRACT_OPERATOR,
  DIVIDE_OPERATOR,
  POW_OPERATOR,
];

export const OPERATOR_REGEX = new RegExp(`[${OPERATORS.join('')}]`)
