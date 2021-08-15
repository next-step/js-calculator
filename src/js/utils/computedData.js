import { OPERATIONS } from "./constants.js";

export default function computedData(operation, num1, num2) {
  switch (operation) {
    case OPERATIONS.ADD:
      return num1 + num2;
    case OPERATIONS.SUBSTRACT:
      return num1 - num2;
    case OPERATIONS.MULTIPLY:
      return num1 * num2;
    case OPERATIONS.DIVIDE:
      return Math.floor(num1 / num2);
    default:
      throw new Error("unknown error");
  }
}
