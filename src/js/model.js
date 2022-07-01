import { operators } from "./operators";

export class Model {
  num1;
  operation;
  num2;

  constructor() {}

  calculate() {
    return operators[this._operation].func(num1, num2);
  }

  reset() {
    this.num1 = undefined;
    this.num2 = undefined;
    this.operation = undefined;
  }
}
