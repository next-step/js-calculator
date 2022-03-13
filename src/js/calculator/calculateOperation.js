import { OPERATION } from "./constant.js";
import { getUsedOperator, isValidOperation } from "./validateOperation.js";

export default function calculateOperation() {
  if (!isValidOperation()) {
    return;
  }

  const usedOperator = getUsedOperator();
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
    OPERATION.innerText = Math.floor(operand1 / operand2);
  }
}
