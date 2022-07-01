import { operators } from "./operators.js";

export class Model {
  num1 = 0;
  num2 = 0;
  operation;

  constructor() {}

  calculate() {
    if (this.operation) {
      return operators[this.operation].func(this.num1, this.num2);
    }
  }

  reset() {
    this.num1 = 0;
    this.num2 = 0;
    this.operation = undefined;
  }

  inputNum(key, value) {
    this[key] *= 10;
    this[key] += value;
  }
}
