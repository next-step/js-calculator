import { DISPLAY, MAX_DIGIT_LENGTH, MESSAGE, OPERATORS } from '../utils/constant';

const isValidDigitLength = () => {
  const displayValue = DISPLAY.innerText;
  const operator = displayValue.split('').find((v) => OPERATORS.includes(v));

  if (!operator) {
    return displayValue.length < MAX_DIGIT_LENGTH;
  }

  return displayValue.split(operator).pop().length < MAX_DIGIT_LENGTH;
};

const putNumber = (num) => {
  if (!isValidDigitLength()) {
    alert(MESSAGE.INVALID_DIGIT_LENGTH);
    return;
  }

  if (DISPLAY.innerText === '0') {
    DISPLAY.innerText = num;
  } else {
    DISPLAY.innerText += num;
  }
};
export const handleCalculatorInput = ({ target }) => {
  if (target.classList.contains('digit')) {
    putNumber(target.innerText);
    return;
  }
  if (target.classList.contains('operation')) {
    return;
  }
  if (target.classList.contains('modifiers')) {
    return;
  }
};
