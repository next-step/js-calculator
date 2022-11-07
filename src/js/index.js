import Calculator from './calculator.js';
import { operations } from './operation.js';
import {
  addACClickEventListener,
  addNumberClickEventListener,
  addOperationClickEventListener,
} from './eventListeners.js';

const calculator = new Calculator();
const total = document.getElementById('total');
const operators = Object.keys(operations);

window.addEventListener('load', () => {
  addNumberClickEventListener(handleNumberClick);
  addOperationClickEventListener(handleOperatorClick);
  addACClickEventListener(clickReset);
});

const handleNumberClick = (e) => {
  const { innerText } = e.currentTarget;

  calculator.setInputs(innerText);
  total.innerText += innerText;
};
const handleOperatorClick = (e) => {
  const { innerText } = e.currentTarget;

  if (innerText === '=') {
    // 계산하기
    calculator.calculate();
    total.innerText = calculator.result;
    return;
  }

  calculator.setOperator(innerText);
  calculator.setInputs(innerText);
  total.innerText += innerText;
};
