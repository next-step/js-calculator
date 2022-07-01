import { operators } from "./operators.js";

export class Model {
  num1 = 0;
  num2 = 0;
  operation;

  constructor() {}

  calculate() {
    if (this._operation) {
      return operators[this._operation].func(num1, num2);
    }
  }

  reset() {
    this.num1 = 0;
    this.num2 = 0;
    this.operation = undefined;
  }
}
