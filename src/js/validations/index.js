import { ALERT_MESSAGE, INIT_DISPLAY_TEXT, OPERATIONS } from '../constants/index.js';
import { numberRegExp } from '../regex/index.js';
import { displayText } from '../utils/index.js';

export const validateDigit = () => {
  if (numberRegExp.test(displayText.innerText)) {
    alert(ALERT_MESSAGE.NO_MORE_THREE_DIGIT)
    return true
  };

  return false
};

export const validateOperation = (clickedOperation, operations) => {
  const lastText = displayText.innerText.slice(-1);
  const operationsValue = Object.values(OPERATIONS);

  if (displayText.innerText === INIT_DISPLAY_TEXT) {
    alert(ALERT_MESSAGE.FIRST_LETTER_NUMBER);
    return true
  };
  
  if (operationsValue.includes(lastText)) {
    alert(ALERT_MESSAGE.NO_DOUBLE_FORMULA);
    return true
  };
    
  if (clickedOperation !== OPERATIONS.EQUAL && operations.length !== 0) {
    alert(ALERT_MESSAGE.NO_THREE_NUMBER);
    return true
  };

  return false
}