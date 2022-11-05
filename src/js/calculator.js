import { DEFAULT_NUM, MAX_LENGTH, OPERATOR } from './const.js';

class Calculator {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
    this.operator = null;
  }

  setNum(nextNum) {
    if (this.operator) {
      this.num2 = nextNum;
    } else {
      this.num1 = nextNum;
    }
  }

  setOperator(nextOperator) {
    this.operator = nextOperator;
  }

  clear() {
    this.num1 = DEFAULT_NUM;
    this.num2 = DEFAULT_NUM;
    this.operator = null;
  }

  compute() {
    switch (this.operator) {
      case OPERATOR.SUM:
        return this.sum();
      case OPERATOR.SUBSTRACT:
        return this.subtract();
      case OPERATOR.MULTIPLY:
        return this.multiply();
      case OPERATOR.DIVIDE:
        return this.divide();
      default:
        return DEFAULT_NUM;
    }
  }

  sum() {
    return this.num1 + this.num2;
  }

  subtract() {
    return this.num1 - this.num2;
  }

  multiply() {
    return this.num1 * this.num2;
  }

  divide() {
    return Math.floor(this.num1 / this.num2);
  }
}

export default Calculator;
