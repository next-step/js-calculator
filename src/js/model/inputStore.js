import { Operator } from "../Operator";

export class InputStore extends Array {
  constructor() {
    super();
    this.operator = new Operator();
  }

  push(item) {
    if (this.operator.isOperator(item) || typeof item === "number") {
      super.push(item);
      return this;
    }
    throw new Error("Operator is not allowed");
  }
}
