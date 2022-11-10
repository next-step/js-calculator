import { DIV_0 } from './constants.js';

class Calculator {
  num1 = 0;
  num2 = 0;
  op = null;
  current = 0;

  add(n, m) {
    return n + m;
  }
  subtract(n, m) {
    return n - m;
  }
  multiply(n, m) {
    return n * m;
  }
  divide(n, m) {
    if (m === 0) throw new Error(DIV_0);
    return Math.floor(n / m);
  }

  initialize() {
    this.num1 = 0;
    this.num2 = 0;
    this.op = null;
    this.current = 0;
  }
}

export const useOperationFunction = (calculator) => ({
  '+': calculator.add,
  '-': calculator.subtract,
  x: calculator.multiply,
  '/': calculator.divide,
});

export default Calculator;
