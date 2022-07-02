import { OPERATORS } from './constants.js';
import handleNumber from './clickNumber.js';
import { handleClickEqual, handleDisplayOperator } from './calculate.js';

const totalValue = document.querySelector('#total');
const allClearButton = document.querySelector('.modifier');
const digitsButton = document.querySelector('.digits');
const operatorButton = document.querySelector('.operations');

let input = '';

digitsButton.addEventListener('click', (e) => {
  const { innerText: numberText } = e.target;

  if (input === '' && numberText === '0') {
    return;
  }

  input = handleNumber(numberText, input);
  totalValue.innerText = input;
});

allClearButton.addEventListener('click', () => {
  input = '';
  totalValue.innerText = 0;
});

operatorButton.addEventListener('click', (e) => {
  // NOTE : 빈인풋에 연산자 click시 alert + return
  if (input === '') {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return;
  }

  const { innerText: operatorText } = e.target;
  const { equal } = OPERATORS;

  if (operatorText === equal) {
    input = handleClickEqual(operatorText, input);
    totalValue.innerText = input;
  } else {
    input = handleDisplayOperator(operatorText, input);
    totalValue.innerText = input;
  }
});
