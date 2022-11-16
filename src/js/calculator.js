import { isSame, isSmallerThan } from "./utils.js";
import { ALERT_MESSAGE } from "./constants.js";

class Calculator {
  #value;

  constructor() {
    this.#value = 0;
    this.CALCULATION_BY_OPERATOR = {
      "+": (prev, cur) => this.sum(prev, cur),
      "-": (prev, cur) => this.subtract(prev, cur),
      X: (prev, cur) => this.multiple(prev, cur),
      "/": (prev, cur) => this.divide(prev, cur),
    };
  }

  get value() {
    return Math.trunc(this.#value);
  }

  sum(left, right) {
    this.#value = left + right;
  }

  subtract(left, right) {
    this.#value = left - right;
  }

  multiple(left, right) {
    this.#value = left * right;
  }

  divide(left, right) {
    this.#value = left / right;
  }

  clear() {
    this.#value = 0;
  }

  calculate({ current, numbers, operators, initialize }) {
    if (isSmallerThan(numbers.length, 1) || isSame(operators.length, 0)) {
      alert(ALERT_MESSAGE.CANT_NOT_CALCULATION);
      initialize();
      return "0";
    }

    operators.forEach((operator, idx) => {
      const totalNumbers = [...numbers, Number(current)];
      const prev = idx === 0 ? totalNumbers[idx] : this.#value;
      const cur = totalNumbers[idx + 1];

      this.CALCULATION_BY_OPERATOR[operator](prev, cur);
    });

    const result = this.value;

    initialize();

    return result;
  }
}

export default Calculator;
