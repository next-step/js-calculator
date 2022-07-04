import { AFTER_ENTER_NUMBER_FIRST, OPERATORS } from './constants.js';
import displayNumber from './displayNumber.js';
import { calculatedResult, displayOperator } from './calculate.js';

const totalValue = document.querySelector('#total');
const allClearButton = document.querySelector('.modifier');
const digitsButton = document.querySelector('.digits');
const operatorButton = document.querySelector('.operations');

let input = '';

const reset = () => {
  input = '';
  totalValue.innerText = 0;
};

digitsButton.addEventListener('click', (e) => {
  const { innerText: numberText } = e.target;

  if (input === '' && numberText === '0') {
    return;
  }

  input = displayNumber(numberText, input);
  totalValue.innerText = input;
});

allClearButton.addEventListener('click', reset);

operatorButton.addEventListener('click', (e) => {
  // NOTE : 빈인풋에 연산자 click시 alert + return
  if (input === '') {
    alert(AFTER_ENTER_NUMBER_FIRST);
    return;
  }

  const { innerText: operatorText } = e.target;
  const { equal } = OPERATORS;

  if (operatorText === equal) {
    const calculatedValue = calculatedResult(operatorText, input);
    if (calculatedValue === '0') {
      reset();
    } else {
      input = calculatedValue;
      totalValue.innerText = input;
    }
  } else {
    input = displayOperator(operatorText, input);
    totalValue.innerText = input;
  }
});
