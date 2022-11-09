import calculator from './calculator.js';
import { ERROR_MESSAGES, VALIDATIONS, MODIFIERS, OPERATORS } from './constants/index.js';
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

const getDomElement = () => {
  const $total = $('#total');

  return {
    $total,
  };
};

const resetResult = () => {
  getDomElement().$total.textContent = '0';
};

const renderResult = (result) => {
  if (result) {
    getDomElement().$total.textContent = result;
    return;
  }

  getDomElement().$total.textContent = calculator.toString();
};

export const handleClickDigits = ({ target }) => {
  const { digit } = target.dataset;

  if (!calculator.operator && calculator.operand1.length >= VALIDATIONS.MAX_DIGIT_NUMBER) {
    alert(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    return;
  }
  if (calculator.operand2.length >= VALIDATIONS.MAX_DIGIT_NUMBER) {
    alert(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    return;
  }

  if (!calculator.operator) {
    calculator.operand1 += digit;
  } else {
    calculator.operand2 += digit;
  }

  renderResult();
};

export const handleClickOperations = ({ target }) => {
  const { operation } = target.dataset;

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
};

export const handleClickModifiers = ({ target }) => {
  const { modifier } = target.dataset;

  modifiersResult[modifier]();
  resetResult();
};
