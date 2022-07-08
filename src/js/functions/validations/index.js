const MAX_DIGIT_LENGTH = 3;
const DUPLICATE_OPERATION = 0;

export const isDigitValidation = (string) => {
  return string.length >= MAX_DIGIT_LENGTH;
};

export const isOperationValidation = (string) => {
  return string.length === DUPLICATE_OPERATION;
};
