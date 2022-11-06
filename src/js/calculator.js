import { isNumber } from './utils.js';
import { DEFAULT_NUMBER, MAX_LENGTH, OPERATOR } from './const.js';

const OPERRATIONS = {
  [OPERATOR.SUM]: (num1, num2) => num1 + num2,
  [OPERATOR.SUBSTRACT]: (num1, num2) => num1 - num2,
  [OPERATOR.MULTIPLY]: (num1, num2) => num1 * num2,
  [OPERATOR.DIVIDE]: (num1, num2) => Math.floor(num1 / num2),
};

class Calculator {
  #num1;
  #num2;
  #output;
  #operator;

  constructor() {
    this.#num1 = DEFAULT_NUMBER;
    this.#num2 = DEFAULT_NUMBER;
    this.#output = null;
    this.#operator = null;
  }

  setNumber(nextNumber) {
    if (this.#operator) {
      this.#num2 = nextNumber;
    } else {
      this.#num1 = nextNumber;
    }
  }

  setOperator(nextOperator) {
    this.#operator = nextOperator;
  }

  clear() {
    this.#num1 = DEFAULT_NUMBER;
    this.#num2 = DEFAULT_NUMBER;
    this.#output = null;
    this.#operator = null;
  }

  compute() {
    this.#output =
      OPERRATIONS[this.#operator](this.#num1, this.#num2) ?? DEFAULT_NUMBER;
  }

  getAppendedNumber(nextNumber) {
    let currentNumber = this.#num1;

    if (this.#operator) {
      currentNumber = this.#num2;
    }

    if (currentNumber === DEFAULT_NUMBER) {
      return nextNumber;
    }

    return Number(`${currentNumber}${nextNumber}`);
  }

  getDisplay() {
    let display = `${this.#num1}`;

    if (this.#operator) {
      display += `${this.#operator}`;
    }

    if (this.#num2) {
      display += `${this.#num2}`;
    }

    if (this.isComputed()) {
      display = `${this.#output}`;
    }

    return display;
  }

  isOverMaxLength(nextNumber) {
    if (String(nextNumber).length > MAX_LENGTH) {
      return true;
    }

    return false;
  }

  isComputed() {
    return isNumber(this.#output);
  }
}

export default Calculator;
