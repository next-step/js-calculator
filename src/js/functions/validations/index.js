const MAX_DIGIT_LENGTH = 3;
const DUPLICATE_OPERATION = 0;

export const isDigitValidation = (digit) => {
  return digit.length >= MAX_DIGIT_LENGTH;
};

export const isOperationValidation = (operation) => {
  return operation.length === DUPLICATE_OPERATION;
};
