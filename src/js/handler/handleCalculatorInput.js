import { INITIAL_VALUE, MAX_DIGIT_LENGTH, MESSAGE, OPERATORS } from '../utils/constant';
import { calculation } from '../utils/calculation';
import { DISPLAY } from '../utils/DOM';

const isValidDigitLength = () => {
  const displayValue = DISPLAY.innerText;
  const operator = displayValue.split('').find((v) => OPERATORS.includes(v));

  if (!operator) {
    return displayValue.length < MAX_DIGIT_LENGTH;
  }

  return displayValue.split(operator)?.pop().length < MAX_DIGIT_LENGTH;
};

const putNumber = (num) => {
  if (!isValidDigitLength()) {
    alert(MESSAGE.INVALID_DIGIT_LENGTH);
    return;
  }

  if (DISPLAY.innerText === INITIAL_VALUE) {
    DISPLAY.innerText = num;
  } else {
    DISPLAY.innerText += num;
  }
};

const isAbleAddOperator = () => {
  if (DISPLAY.innerText === INITIAL_VALUE) {
    return false;
  }
  return !Number.isNaN(Number(DISPLAY.innerText[DISPLAY.innerText.length - 1]));
};

const putResult = () => {
  const operator = DISPLAY.innerText.split('').find((v) => OPERATORS.includes(v));
  const operands = DISPLAY.innerText.split(operator);
  const num1 = Number(operands.shift());
  const num2 = Number(operands.shift());

  DISPLAY.innerText = calculation({ num1, num2, operator });
};

const putOperator = (operator) => {
  if (operator === '=') {
    putResult();
    return;
  }

  if (!isAbleAddOperator()) {
    alert(MESSAGE.NEED_ENTER_NUMBER);
    return;
  }

  DISPLAY.innerText += operator;
};

export const handleCalculatorInput = ({ target }) => {
  if (target.classList.contains('digit')) {
    putNumber(target.innerText);
    return;
  }
  if (target.classList.contains('operation')) {
    putOperator(target.innerText);
    return;
  }
  if (target.classList.contains('modifier')) {
    DISPLAY.innerText = INITIAL_VALUE;
    return;
  }
};
