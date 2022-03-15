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

  const operationExecutor = {
    "+": (operand1, operand2) => operand1 + operand2,
    "-": (operand1, operand2) => operand1 - operand2,
    "X": (operand1, operand2) => operand1 * operand2,
    "/": (operand1, operand2) => Math.floor(operand1 / operand2),
  };

  OPERATION.innerText = operationExecutor[usedOperator](operand1, operand2);
}
