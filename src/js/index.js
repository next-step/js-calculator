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

const clickReset = () => {
  calculator.reset();
  total.innerText = '0';
};

const handleNumberClick = (e) => {
  const { innerText } = e.currentTarget;

  if (!isValidForZero(innerText)) return;
  if (!isValidForDigits()) return;

  calculator.setInputs(innerText);
  total.innerText += innerText;
};

const handleOperatorClick = (e) => {
  const { innerText } = e.currentTarget;
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
  // 처음에 0이 들어오는지 확인
  if (isZeroRemain && inputText === '0') {
    return false;
  }
  // 0이 아닌 경우 0을 없앰.
  if (isZeroRemain && inputText !== '0') {
    total.innerText = inputText;
    calculator.setInputs(total.innerText);
    return false;
  }
  return true;
};

const isValidForDigits = () => {
  const savedOperator = calculator.operator;
  // 3자리수 초과 불가 체크 (연산자 없는 경우)
  if (!savedOperator && total.innerText.length === 3) {
    alert('3자리까지만 입력이 가능합니다.');
    return false;
  }
  // 3자리수 초과 불가 체크 (연산자 있는 경우)
  if (savedOperator) {
    // TODO: 추후 확장될 경우 리팩토링 필요
    const indexOfOperator = total.innerText.indexOf(savedOperator);
    if (total.innerText.slice(indexOfOperator + 1).length === 3) {
      alert('3자리까지만 입력이 가능합니다.');
      return false;
    }
  }
  return true;
};
