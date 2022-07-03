import { totalDisplayText } from './DOM.js';
import { OPERATORS } from './constants.js';
import { rIsNotNumber } from './regex.js';

const handleCalculate = (
  beforeNumber = 0,
  operator = OPERATORS.plus,
  afterNumber = 0
) => {
  const operators = {
    '/': (x, y) => Math.floor(x / y),
    X: (x, y) => x * y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
  };

  totalDisplayText.innerText = operators[operator](beforeNumber, afterNumber);
};

const handleDisplayOperator = (operator) => {
  const displayResult = totalDisplayText.innerText.concat(operator);
  const operatorList = displayResult
    .split('')
    .filter((text) => Number.isNaN(Number(text)));

  if (operatorList.length > 1) {
    alert('2개의 숫자에 대해서만 연산이 가능합니다!');
    return;
  }

  totalDisplayText.innerText = displayResult;
};

const enterOperator = (e) => {
  const { innerText: operator } = e.target;
  const { equal } = OPERATORS;
  const numberList = totalDisplayText.innerText.split(rIsNotNumber);

  if (totalDisplayText.innerText === '0') {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return;
  }

  if (operator === equal) {
    const [beforeNumber, afterNumber] = numberList;
    const [operator] = totalDisplayText.innerText
      .split('')
      .filter((text) => Number.isNaN(Number(text)));
    handleCalculate(Number(beforeNumber), operator, Number(afterNumber));

    return;
  }
  handleDisplayOperator(operator);
};

export default enterOperator;
