import {
  CALCULATE_OPERATOR,
  OPERATOR_REGEX,
  OPERATORS,
} from './constants/operator.js';
import calculate from './calculator.js';
import { MAX_INPUT_DIGITS, INITIAL_DIGITS } from './constants/calculator.js';
import { lastIndexOf } from './util/array-util.js';

const TOTAL_ELEMENT = document.getElementById('total');
const DIGITS_ELEMENTS = document.querySelector('.digits');
const OPERATORS_ELEMENTS = document.querySelector('.operations');
const CLEAR_ELEMENT = document.getElementById('initial');

function getTotal() {
  return TOTAL_ELEMENT.innerText;
}

function getAddToTotal(value) {
  return getTotal() + value;
}

function getDigitListFromTotal() {
  return getTotal()
    .split(OPERATOR_REGEX)
    .filter((operator) => operator);
}

function getOperationListFromTotal() {
  return getTotal().replace(/[0-9]/g, '').split('');
}

function getLastDigitsFromTotal() {
  return getDigitListFromTotal().pop();
}

function getLastValueFromTotal() {
  return getTotal()[lastIndexOf(getTotal())];
}

function getFirstValueFromTotal() {
  return getDigitListFromTotal()[0];
}

function changeTotal(value) {
  TOTAL_ELEMENT.innerText = value;
}

function clearTotal() {
  changeTotal(INITIAL_DIGITS);
}

function isInitTotal(value) {
  return value === INITIAL_DIGITS;
}

function isMaxDigit(value) {
  return value.length >= MAX_INPUT_DIGITS;
}

function isLastValueOperator() {
  return OPERATORS.some((operator) => operator === getLastValueFromTotal());
}

function calculateTotal() {
  return Math.floor(
    getOperationListFromTotal().reduce((result, operator, index) => {
      const currentValue = getDigitListFromTotal()[index + 1];
      return calculate({
        total: result,
        value: currentValue,
        operator,
      });
    }, getFirstValueFromTotal())
  );
}

function notificationMaxInputDigits() {
  alert(`숫자는 ${MAX_INPUT_DIGITS}자리까지만 입력 가능합니다!`);
}

function notificationConsecutiveInputOperator() {
  alert('연산전 숫자를 입력하세요.');
}

function operatorHandler(event) {
  const operator = event?.target?.innerText;

  if (isLastValueOperator()) {
    notificationConsecutiveInputOperator();
    return;
  }

  changeTotal(getAddToTotal(operator));
}

function digitHandler(event) {
  const digit = event?.target?.innerText;

  if (isInitTotal(getTotal())) {
    changeTotal(digit);
    return;
  }

  if (isLastValueOperator() === false && isMaxDigit(getLastDigitsFromTotal())) {
    notificationMaxInputDigits();
    return;
  }

  changeTotal(getAddToTotal(digit));
}

function calculateHandler() {
  changeTotal(calculateTotal());
}

export default function initialize() {
  DIGITS_ELEMENTS.addEventListener('click', digitHandler);

  OPERATORS_ELEMENTS.addEventListener('click', (event) => {
    const isCalculateOperator = event?.target?.innerText === CALCULATE_OPERATOR;
    if (isCalculateOperator) {
      calculateHandler();
      return;
    }

    operatorHandler(event);
  });

  CLEAR_ELEMENT.addEventListener('click', clearTotal);
}
