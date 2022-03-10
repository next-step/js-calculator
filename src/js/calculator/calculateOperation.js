import { OPERATION } from "./constant.js";
import { isValidOperation } from "./validateOperation.js";

function calculateOperation() {
  const usedOperator = isValidOperation();
  const currentOperation = OPERATION.innerText;
  const operations = currentOperation.split(usedOperator);

  const operand1 = Number(operations[0]);
  const operand2 = Number(operations[1]);

  if (usedOperator === "+") {
    OPERATION.innerText = operand1 + operand2;
  } else if (usedOperator === "-") {
    OPERATION.innerText = operand1 - operand2;
  } else if (usedOperator === "X") {
    OPERATION.innerText = operand1 * operand2;
  } else {
    OPERATION.innerText = operand1 / operand2;
  }
}

export { calculateOperation };
