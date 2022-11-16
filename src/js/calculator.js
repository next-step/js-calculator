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

  calculate({ prev, cur, operator }) {
    this.CALCULATION_BY_OPERATOR[operator](prev, cur);
  }
}

export default Calculator;
