class Calculator {
  #value;

  constructor() {
    this.#value = 0;
  }

  get value() {
    return Math.floor(this.#value);
  }

  sum(pre, cur) {
    this.#value = pre + cur;
  }

  subtract(pre, cur) {
    this.#value = pre - cur;
  }

  multiple(pre, cur) {
    this.#value = pre * cur;
  }

  divide(pre, cur) {
    this.#value = pre / cur;
  }

  clear() {
    this.#value = 0;
  }
}

export default Calculator;
