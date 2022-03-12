import { Operator } from "../Operator.mjs";

export class InputStore extends Array {
  constructor(...array) {
    super(...array);
    this.operator = new Operator();
  }

  push(item) {
    if (this.operator.isOperator(item) || /^[0-9]$/.test(item)) {
      super.push(item);
      return this;
    }
    throw new Error(`not allowed item ${item}`);
  }
}
