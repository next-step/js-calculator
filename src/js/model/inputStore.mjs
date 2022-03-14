import { Operator } from "./Operator.mjs";
import {isDigit} from "../util.mjs";

export class InputStore extends Array {
  constructor(...array) {
    super(...array);
    this.operator = new Operator();
  }

  push(item) {
    if (this.operator.isOperator(item) || isDigit(item)) {
      super.push(item);
      return this;
    }
    throw new Error(`not allowed item ${item}`);
  }
}
