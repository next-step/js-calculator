import { ERROR_MESSAGE, INIT_DISPLAY_TEXT, OPERATIONS } from '../constants/index.js';
import { numberRegExp } from '../regex/index.js';
import { displayText } from '../utils/index.js';

export const validateDigit = (digit) => {
  return numberRegExp.test(digit) ? ERROR_MESSAGE.NO_MORE_THREE_DIGIT : ERROR_MESSAGE.NO_ERROR
}

export const validateOperation = (clickedOperation, operations, lastText, operationsValue) => {

  if (displayText.innerText === INIT_DISPLAY_TEXT) {
    return ERROR_MESSAGE.FIRST_LETTER_NUMBER
  };
  
  if (operationsValue.includes(lastText)) {
    return ERROR_MESSAGE.NO_DOUBLE_FORMULA
  };
    
  if (clickedOperation !== OPERATIONS.EQUAL && operations.length !== 0) {
    return ERROR_MESSAGE.NO_THREE_NUMBER
  };

  return ERROR_MESSAGE.NO_ERROR
}