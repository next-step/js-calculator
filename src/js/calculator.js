import { isNumber } from './utils.js';
import { DEFAULT_NUMBER, OPERATOR } from './const.js';

const OPERATORS = {
  [OPERATOR.SUM]: (num1, num2) => num1 + num2,
  [OPERATOR.SUBTRACT]: (num1, num2) => num1 - num2,
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
    if (this.#operator === null) {
      this.#num1 = nextNumber;
    } else {
      this.#num2 = nextNumber;
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
    const operator = OPERATORS[this.#operator];
    this.#output = operator(this.#num1, this.#num2);
  };

  appendNumber = (nextNumber) => {
    const currentNumber =
      (this.#operator === null ? this.#num1 : this.#num2) ?? DEFAULT_NUMBER;

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
}

export default Calculator;
