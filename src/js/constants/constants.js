export const MAX_DIGIT = 3;
export const MAX_OPERAND_LENGTH = 2;
export const MAX_OPERATORS_LENGTH = MAX_OPERAND_LENGTH - 1;

export const OPERATOR = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: 'x',
  DIVIDE: '/',
  EQUAL: '=',
};

export const OPERATION = {
  [OPERATOR.PLUS]: 'plus',
  [OPERATOR.MINUS]: 'minus',
  [OPERATOR.MULTIPLY]: 'multiply',
  [OPERATOR.DIVIDE]: 'divide',
  [OPERATOR.EQUAL]: 'equal',
}