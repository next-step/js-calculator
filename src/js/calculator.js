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
    this.#num1 = null;
    this.#num2 = null;
    this.#output = null;
    this.#operator = null;
  }

  setNumber = (nextNumber) => {
    if (this.#operator) {
      this.#num2 = nextNumber;
    } else {
      this.#num1 = nextNumber;
    }
  };

  setOperator = (nextOperator) => {
    this.#operator = nextOperator;
  };

  clear = () => {
    this.#num1 = null;
    this.#num2 = null;
    this.#output = null;
    this.#operator = null;
  };

  compute = () => {
    this.#output = OPERRATIONS[this.#operator](this.#num1, this.#num2);
  };

  appendNumber = (nextNumber) => {
    let currentNumber = this.#num1 ?? DEFAULT_NUMBER;

    if (this.#operator) {
      currentNumber = this.#num2 ?? DEFAULT_NUMBER;
    }

    if (currentNumber === DEFAULT_NUMBER) {
      return nextNumber;
    }

    return Number(`${currentNumber}${nextNumber}`);
  };

  getDisplay = () => {
    if (isNumber(this.#output)) {
      return this.#output;
    }

    if (isNumber(this.#num2)) {
      return this.#num2;
    }

    return this.#num1 ?? DEFAULT_NUMBER;
  };

  isOverMaxLength = (nextNumber) => {
    if (String(nextNumber).length > MAX_LENGTH) {
      return true;
    }

    return false;
  };
}

export default Calculator;
