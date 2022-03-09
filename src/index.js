import { ALERT_MESSAGES, LIMIT_NUMBER } from './constants.js';

const $total = document.querySelector('#total');
const $modifier = document.querySelector('.modifier');
const $digitsContainer = document.querySelector('.digits');
const $operationsContainer = document.querySelector('.operations');

let leftNumber = null;
let rightNumber = null;
let operator = '';

// global Logic
const showAlertMessage = (message) => {
  alert(message);
};

const getNewTotalValue = () =>
  `${leftNumber === null ? '' : leftNumber}${operator === '' ? '' : operator}${
    rightNumber === null ? '' : rightNumber
  }`;

const paintTotalNumberDisplay = () => {
  $total.innerHTML = getNewTotalValue();
};

// AC Button Logic
const resetNumbersAndOperator = () => {
  leftNumber = null;
  rightNumber = null;
  operator = '';
};

const clickModifierHandler = () => {
  resetNumbersAndOperator();
  $total.innerHTML = '0';
};

// Number Button Logic
const isNotSafeNumberRange = (number) => number >= LIMIT_NUMBER;
const isRequireOperatorFirst = () => leftNumber !== null && operator === '';
const getNewRightNumber = (clickedNumber) => (rightNumber ? rightNumber * 10 + clickedNumber : clickedNumber);

const canNotProceedDigitHander = () => {
  let canNotProceed = false;

  if (isNotSafeNumberRange(rightNumber)) {
    showAlertMessage(ALERT_MESSAGES.OPERAND_RANGE);
    canNotProceed = true;
  }

  if (isRequireOperatorFirst()) {
    showAlertMessage(ALERT_MESSAGES.OPERATOR_FIRST_REQUIREMENT);
    canNotProceed = true;
  }

  return canNotProceed;
};

const clickDigitHandler = (e) => {
  const clickedNumber = Number(e.target.textContent);

  if (canNotProceedDigitHander()) {
    return;
  }

  rightNumber = getNewRightNumber(clickedNumber);
  paintTotalNumberDisplay();
};

// Operator Button Logic
const isEmptyLeftNumber = () => leftNumber === null;
const isEmptyRightNumber = () => rightNumber === null;
const isNotEmptyOperator = () => operator !== '';
const isReadyCalculate = () => operator !== '' && rightNumber !== null;
const isRequireCalculateFirst = (clickedOperator) =>
  leftNumber !== null && operator !== '' && rightNumber !== null && clickedOperator !== '=';

const clearOperatorAndRightNumber = () => {
  operator = '';
  rightNumber = null;
};

const calculateExpression = () => {
  switch (operator) {
    case '+':
      leftNumber += rightNumber;
      break;
    case '-':
      leftNumber -= rightNumber;
      break;
    case 'X':
      leftNumber *= rightNumber;
      break;
    case '/':
      leftNumber = Math.floor(leftNumber / rightNumber);
      break;
    default:
      console.error(`유효하지 않은 표현식입니다. : ${(leftNumber, operator, rightNumber)}`);
  }
};

const dispatchCalculate = () => {
  if (!isReadyCalculate()) {
    return;
  }

  calculateExpression();
  clearOperatorAndRightNumber();
  paintTotalNumberDisplay();
};

const dispatchOperator = (newOperator) => {
  operator = newOperator;
  leftNumber = leftNumber ?? rightNumber;
  rightNumber = null;

  paintTotalNumberDisplay();
};

const canNotProceedOperationHandler = (clickedOperator) => {
  let canNotProceed = false;

  if ((isEmptyLeftNumber() && isEmptyRightNumber()) || (isNotEmptyOperator() && isEmptyRightNumber())) {
    showAlertMessage(ALERT_MESSAGES.OPERAND_FIRST_REQUIREMENT);
    canNotProceed = true;
  }

  if (isRequireCalculateFirst(clickedOperator)) {
    showAlertMessage(ALERT_MESSAGES.CALCULATE_FIRST_REQUIREMENT);
    canNotProceed = true;
  }

  return canNotProceed;
};

const clickOperationHandler = (e) => {
  const clickedOperator = e.target.textContent;

  if (canNotProceedOperationHandler(clickedOperator)) {
    return;
  }

  if (clickedOperator !== '=') {
    dispatchOperator(clickedOperator);
    return;
  }

  dispatchCalculate();
};

$digitsContainer.addEventListener('click', clickDigitHandler);
$operationsContainer.addEventListener('click', clickOperationHandler);
$modifier.addEventListener('click', clickModifierHandler);
