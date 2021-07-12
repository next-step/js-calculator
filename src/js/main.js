import { onNumberClick, onOperatorClick, onResetClick, onEqualClick } from './event.js';

const digitButtons = document.querySelectorAll('.digits');
const operationButtons = document.querySelectorAll('.operations');
const resetButton = document.querySelector('#reset');
const equalButton = document.querySelector('#equal');

digitButtons.forEach((digit) => digit.addEventListener('click', onNumberClick));
operationButtons.forEach((operator) => operator.addEventListener('click', onOperatorClick));
equalButton.addEventListener('click', onEqualClick);
resetButton.addEventListener('click', onResetClick);
