import {
  MAX_DIGIT,
  MAX_OPERAND_LENGTH,
  MAX_OPERATORS_LENGTH,
  ERROR,
  OPERATOR,
} from './constants/index.js';

export const validateDigit = (operands, operators) => {
  let isValid = true;

  const lastOperand = operands[operators.length] || '';

  if (String(lastOperand).length >= MAX_DIGIT) {
    alert(ERROR.OVER_MAX_DIGIT(MAX_DIGIT));
    isValid = false;
  }

  return isValid;
};

export const validateOperator = (operands, operators) => {
  let isValid = true;

  if (operands.length === 0) {
    alert(ERROR.DIGIT_FIRST);
    isValid = false;
  }

  if (operators.length === MAX_OPERATORS_LENGTH) {
    alert(ERROR.OVER_MAX_OPERAND_COUNT(MAX_OPERAND_LENGTH));
    isValid = false;
  }

  return isValid;
};

const getInteger = (num) => {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
};

const calculate = (num1, num2, operator) => {
  switch (operator) {
    case OPERATOR.PLUS:
      return num1 + num2;
    case OPERATOR.MINUS:
      return num1 - num2;
    case OPERATOR.MULTIPLY:
      return num1 * num2;
    case OPERATOR.DIVIDE:
      return getInteger(num1 / num2);
  }
};

export const calculateData = (operands, operators) => {
  return calculate(operands[0], operands[1], operators[0]);
};
