import { OPERATION } from "./constant.js";

function getUsedOperator() {
  const usedOperator = OPERATION.innerText.split("").find(element => ["+", "-", "X", "/"].includes(element));
  return usedOperator;
}

function is3DigitsOrLess() {
  let digitLength = 0;
  const currentOperation = OPERATION.innerText;
  const operator = getUsedOperator(currentOperation);

  if (operator) {
    digitLength = currentOperation.split(operator)[1].length + 1;
  } else {
    digitLength = currentOperation.length + 1;
  }

  if (digitLength > 3) {
    alert("숫자는 3자리까지만 입력할 수 있습니다.");
    return false;
  }
  return true;
}

function isValidOperation() {
  const currentOperation = OPERATION.innerText;
  const currentOperationEnd = currentOperation[currentOperation.length - 1];
  const usedOperator = getUsedOperator();

  if (Number.isNaN(Number(currentOperationEnd))) {
    alert("계산식이 올바르지 않습니다. \n(계산식의 마지막이 연산자로 끝남.)");
    return false;
  }

  if (!usedOperator) {
    alert("계산식이 올바르지 않습니다. \n(연산자가 사용되지 않음.)");
    return false;
  }

  return usedOperator;
}

export { getUsedOperator, is3DigitsOrLess as isOver3Digits, isValidOperation };
