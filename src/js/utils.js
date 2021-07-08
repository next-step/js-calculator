import { MAX_DIGIT, ERROR, OPERATOR } from './constants/index.js';

export const validateDigit = (digit, operands, operators) => {
  let isValid = true;

  const lastOperand = operands[operators.length] || '';

  if (String(lastOperand).length >= MAX_DIGIT) {
    alert(ERROR.OVER_MAX_DIGIT(MAX_DIGIT));
    isValid = false;
  }

  return isValid;
};

export const validateOperator = (operands) => {
  let isValid = true;

  if (operands.length === 0) {
    alert(ERROR.DIGIT_FIRST);
    isValid = false;
  }

  return isValid;
};

const getInteger = (num) => {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
};

const cal = (num1, num2, operator) => {
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

export const calculate = (operands, operators) => {
  return cal(operands[0], operands[1], operators[0]);
};
