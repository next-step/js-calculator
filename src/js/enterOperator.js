import { totalDisplayText } from './index.js';
import { OPERATORS } from './constants.js';
import { rIsNotNumber } from './regex.js';

const getFloorNumber = (number) => {
  return Math.floor(number);
};

const handleCalculate = (
  beforeNumber = 0,
  operator = OPERATORS.plus,
  afterNumber = 0
) => {
  const { divide, multiple, minus, plus } = OPERATORS;
  if (operator === divide) {
    totalDisplayText.innerText = getFloorNumber(
      Number(beforeNumber) / Number(afterNumber)
    );
    return;
  }
  if (operator === multiple) {
    totalDisplayText.innerText = getFloorNumber(
      Number(beforeNumber) * Number(afterNumber)
    );
    return;
  }
  if (operator === minus) {
    totalDisplayText.innerText = getFloorNumber(
      Number(beforeNumber) - Number(afterNumber)
    );
    return;
  }
  if (operator === plus) {
    totalDisplayText.innerText = getFloorNumber(
      Number(beforeNumber) + Number(afterNumber)
    );
    return;
  }
};

const handleDisplayOperator = (operator) => {
  const displayResult = totalDisplayText.innerText.concat(operator);
  const operatorList = displayResult
    .split('')
    .filter((text) => isNaN(Number(text)));

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
      .filter((text) => isNaN(Number(text)));
    handleCalculate(beforeNumber, operator, afterNumber);

    return;
  }
  handleDisplayOperator(operator);
};

export default enterOperator;
