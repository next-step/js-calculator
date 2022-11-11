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

const handleResetClick = () => {
  calculator.reset();
  total.innerText = '0';
};

const handleNumberClick = (e) => {
  const { innerText } = e.target;

  if (!isValidForZero(innerText)) return;
  if (!isValidForDigits()) {
    alert('3자리까지만 입력이 가능합니다.');
    return;
  }

  calculator.setInputs(innerText);
  total.innerText += innerText;
};

const handleOperatorClick = (e) => {
  const { innerText } = e.target;
  // 연산자 이미 존재하는지 확인
  if (calculator.operator && innerText !== '=') {
    alert('두 개의 숫자에 대해서만 연산이 가능합니다.');
    return;
  }
  // 연산자 뒤 또 연산자 오는지 확인 (3+= 같은 케이스 방지)
  const recentInputText = calculator.inputs[calculator.inputs.length - 1];
  const hasNextOperator = operators.includes(recentInputText);
  if (hasNextOperator) {
    alert('연산자 뒤에는 숫자만 옵니다.');
    return;
  }

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

const isValidForZero = (inputText) => {
  const isZeroRemain = total.innerText.length === 1 && total.innerText === '0';
  if (isZeroRemain && inputText === '0') {
    return false;
  }
  if (isZeroRemain && inputText !== '0') {
    total.innerText = inputText;
    calculator.setInputs(total.innerText);
    return false;
  }
  return true;
};

const isValidForDigits = () => {
  const savedOperator = calculator.operator;
  if (!savedOperator && total.innerText.length === 3) {
    return false;
  }
  if (savedOperator) {
    const indexOfOperator = total.innerText.indexOf(savedOperator);
    if (total.innerText.slice(indexOfOperator + 1).length === 3) {
      return false;
    }
  }
  return true;
};

addNumberClickEventListener(handleNumberClick);
addOperationClickEventListener(handleOperatorClick);
addACClickEventListener(handleResetClick);
