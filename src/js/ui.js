import makeListener from './listeners.js';

export const listeners = {
  modifier: ({ total, calculator }) =>
    makeListener('.modifier', function () {
      calculator.initialize();
      setDisplay(total, 0);
    }),
  digits: ({ total, calculator }) =>
    makeListener('.digit', function () {
      accumulateTotalNumber(calculator, parseInt(this.innerText));
      updateDisplay(calculator, total);
    }),
  operations: ({ total, calculator }) =>
    makeListener('.operation', function () {
      setOperation(calculator, total, this.innerText);
    }),
};

function setOperation(calculator, total, operation) {
  if (operation === '=') {
    const operationFunction = {
      '+': calculator.add,
      '-': calculator.subtract,
      x: calculator.multiply,
      '/': calculator.divide,
    };
    calculator.num2 = calculator.current;
    const op = calculator.op.toLowerCase();
    calculator.current = operationFunction[op](
      calculator.num1,
      calculator.num2
    );
    setDisplay(total, calculator.current);
    return;
  }
  calculator.num1 = calculator.current;
  calculator.op = operation;
  clearTotal(calculator);
}

function accumulateTotalNumber(calculator, number = 0) {
  if (calculator.op && calculator.current === 0) {
    clearTotal(calculator);
  }

  const { current } = calculator;
  if (current > 99) return;
  calculator.current = current * 10 + number;
}

function updateDisplay(calculator) {
  if (!total) return;
  total.innerText = calculator.current;
}

function clearTotal(calculator) {
  calculator.current = 0;
}

function setDisplay(total, num) {
  total.innerText = num;
}
