import { totalInput } from './index.js';
import { INITIAL_NUMBER, MAX_VALUE, Operator } from './constants.js';
import { calculator, calculate } from './calculator.js';

let operand = '';

export const insertNumber = (event) => {
  const { value: current } = event.target;
  operand += current;

  if (isMaxValue(operand)) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return;
  }

  if (totalInput.innerText === INITIAL_NUMBER) {
    totalInput.innerText = Number(totalInput.innerText + current);
    return;
  }
  totalInput.innerText += current;
};

export const insertOperator = (event) => {
  const { value: current } = event.target;
  const { textContent: total } = totalInput;

  const isNaNPreviousChar = isNaN(total[total.length - 1]);

  if (total && current === Operator.EQUALS) {
    const operator = findOperator();
    const [firstOperand, secondOperand] = findNumber(operator);
    const answer = calculate(operator, firstOperand, secondOperand);
    totalInput.innerText = answer;
    operand = answer;
    return;
  }

  if (isNaNPreviousChar || total === INITIAL_NUMBER) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return;
  }
  operand = '';
  totalInput.innerText += current;
};

const findNumber = (operator) => {
  const { textContent: total } = totalInput;

  return total
    .split(operator)
    .filter((elem) => !isNaN(elem))
    .map((elem) => Number(elem));
};

const findOperator = () => {
  const { textContent: total } = totalInput;

  return total
    .split('')
    .filter((elem) => isNaN(elem))
    .join('');
};

const isMaxValue = (num) => Number(num) > MAX_VALUE;

export const allClear = () => {
  totalInput.innerText = 0;
  operand = '';
};
