/* eslint-disable no-alert */
import calculator from './calculator.js';
import { ERROR_MESSAGES, MAX_DIGIT_NUMBER, MODIFIERS, OPERATORS } from './constants/index.js';
import { $ } from './utils/dom.js';

const operatorsResult = {
  [OPERATORS.PLUS]: () => calculator.add(),
  [OPERATORS.MINUS]: () => calculator.sub(),
  [OPERATORS.MULTIPLY]: () => calculator.mul(),
  [OPERATORS.DIVIDE]: () => calculator.div(),
};

const modifiersResult = {
  [MODIFIERS.AC]: () => calculator.reset(),
};

const $total = $('#total');
const $digits = $('div.digits');
const $modifiers = $('div.modifiers');
const $operations = $('div.operations');

const resetResult = () => {
  $total.textContent = '0';
};

const renderResult = (result) => {
  if (result) {
    $total.textContent = result;
    return;
  }

  $total.textContent = calculator.toString();
};

$digits.addEventListener('click', ({ target }) => {
  const digit = target.textContent;

  if (!calculator.operator && calculator.operand1.length >= MAX_DIGIT_NUMBER) {
    alert(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    return;
  }
  if (calculator.operand2.length >= MAX_DIGIT_NUMBER) {
    alert(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    return;
  }

  if (!calculator.operator) {
    calculator.operand1 += digit;
  } else {
    calculator.operand2 += digit;
  }

  renderResult();
});

$operations.addEventListener('click', ({ target }) => {
  const operation = target.textContent;

  if (!calculator.operator) {
    calculator.operator = operation;
    renderResult();
    return;
  }

  const result = operatorsResult[calculator.operator]();
  renderResult(result);

  if (operation === '=') {
    return;
  }

  calculator.reset();
  calculator.operand1 = result;
  calculator.operator = operation;
  renderResult();
});

$modifiers.addEventListener('click', ({ target }) => {
  const modifier = target.textContent;

  modifiersResult[modifier]();
  resetResult();
});
