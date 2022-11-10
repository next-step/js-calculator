import { useOperationFunction } from './Calculator.js';
import { DIV_0, INVALID_OP } from './constants.js';

const makeListener = (selector, callback) => {
  const elements = document.querySelectorAll(selector) || [];
  elements.forEach((element) => element.addEventListener('click', callback));
};

export const listeners = {
  modifier: ({ total, calculator }) =>
    makeListener('.modifier', function () {
      calculator.initialize();
      setDisplay(total, 0);
    }),
  digits: ({ total, calculator }) =>
    makeListener('.digit', function () {
      accumulateTotalNumber(calculator, parseInt(this.innerText));
      setDisplay(total, calculator.current);
    }),
  operations: ({ total, calculator }) =>
    makeListener('.operation', function () {
      setOperation(calculator, total, this.innerText);
    }),
};

function setOperation(calculator, total, operation) {
  if (operation === '=') {
    calculate(calculator, total);
    return;
  }
  calculator.num1 = calculator.current;
  calculator.op = operation;
  clear(calculator);
}

function calculate(calculator, total) {
  try {
    const operationFunction = useOperationFunction(calculator);
    calculator.num2 = calculator.current;
    const op = calculator.op.toLowerCase();
    if (!Object.keys(operationFunction).includes(op)) throw new Error(INVALID_OP);
    calculator.current = operationFunction[op](calculator.num1, calculator.num2);
    setDisplay(total, calculator.current);
  } catch (error) {
    const cases = {
      [DIV_0]: () => setDisplay(total, '숫자 아님'),
      [INVALID_OP]: () => setDisplay(total, '연산자 오류'),
    };
    if (!cases[error.message]) throw new Error(error);
    cases[error.message]();
  }
}

function accumulateTotalNumber(calculator, number = 0) {
  if (calculator.op && calculator.current === 0) {
    clear(calculator);
  }

  const { current } = calculator;
  if (current > 99) return;
  calculator.current = current * 10 + number;
}

function clear(calculator) {
  calculator.current = 0;
}

function setDisplay(total, num) {
  total.innerText = num;
}
