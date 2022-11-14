import Calculator from './calculator.js';
import { operations } from './operation.js';
import {
  addACClickEventListener,
  addNumberClickEventListener,
  addOperationClickEventListener,
} from './eventListeners.js';

import { isValidForDigits, isValidForZero } from './validators.js';

const calculator = new Calculator();
const total = document.getElementById('total');
const operators = Object.keys(operations);

const handleResetClick = () => {
  calculator.reset();
  total.innerText = '0';
};

const handleNumberClick = (e) => {
  const { innerText } = e.target;

  if (
    !isValidForZero({
      inputText: innerText,
      totalInnerText: total.innerText,
      operator: calculator.operator,
    })
  ) {
    return;
  }
  if (!isValidForDigits({ savedOperator: calculator.operator, totalInnerText: total.innerText })) {
    alert('3자리까지만 입력이 가능합니다.');
    return;
  }
  total.innerText = innerText;
  calculator.setInputs(innerText);
  total.innerText = calculator.inputs.join('');
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

addNumberClickEventListener(handleNumberClick);
addOperationClickEventListener(handleOperatorClick);
addACClickEventListener(handleResetClick);
