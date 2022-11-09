import { VALIDATIONS } from '../constants/index.js';

export const validateOperand = ({ operand1, operand2, operator }) => {
  const isInValidOperand1 = operator === '' && operand1.length >= VALIDATIONS.MAX_DIGIT_NUMBER;
  const isInValidOperand2 = operand2.length >= VALIDATIONS.MAX_DIGIT_NUMBER;

  if (isInValidOperand1 || isInValidOperand2) {
    return false;
  }

  return true;
};
