"use strict";

const $ = (selector) => document.querySelector(selector);

const OPERATION = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "X",
  DIVIDE: "/",
  EQUAL: "=",
};

const operationList = [
  OPERATION.ADD,
  OPERATION.SUBTRACT,
  OPERATION.MULTIPLY,
  OPERATION.DIVIDE,
];

const $total = $("#total");
const $digits = $(".digits");
const $operations = $(".operations");
const $modifier = $(".modifier");

let isOperationClicked = false;
let isRightOperandIn = false; // 두번째 인자가 들어왔는지 체크
let leftOperand = 0;
let rightOperand = 0;
let operation = "";
let result = 0;

const resetCalculator = () => {
  isOperationClicked = false;
  isRightOperandIn = false;
  leftOperand = 0;
  rightOperand = 0;
  operation = "";
  result = 0;
  $total.textContent = "0";
};

// 결과창에 보여줄 숫자 제어
const showTotalNumber = (currentTotal, nextNumber) => {
  if (isOperationClicked && !isRightOperandIn) {
    isRightOperandIn = true;
    return nextNumber;
  }
  if (currentTotal === "0") {
    return nextNumber;
  }
  return currentTotal + nextNumber;
};

const calculate = (currentOperation) => {
  // 연산자 연속 클릭시 마지막 연산자 반영
  if (isOperationClicked && currentOperation !== OPERATION.EQUAL) {
    operation = currentOperation;
    return;
  }

  if (operationList.includes(currentOperation)) {
    operation = currentOperation;
    leftOperand = parseInt($total.textContent);
    isOperationClicked = true;
  }

  if (currentOperation === OPERATION.EQUAL) {
    rightOperand = parseInt($total.textContent);

    switch (operation) {
      case OPERATION.ADD:
        result = leftOperand + rightOperand;
        break;
      case OPERATION.SUBTRACT:
        result = leftOperand - rightOperand;
        break;
      case OPERATION.MULTIPLY:
        result = leftOperand * rightOperand;
        break;
      case OPERATION.DIVIDE:
        result = leftOperand / rightOperand;
        break;
      default:
        return;
    }
    $total.textContent = Math.floor(result);
    leftOperand = result; // 지금까지 결과값을 op1에 저장한다
    isRightOperandIn = false;
    isOperationClicked = false;
    operation = OPERATION.EQUAL;
  }
};

$digits.addEventListener("click", (e) => {
  let newTotal = "";
  const currentTotal = $total.textContent;
  const nextNumber = e.target.textContent;

  newTotal = showTotalNumber(currentTotal, nextNumber);

  if (newTotal.length > 3) {
    alert("3자리 수까지 입력 가능합니다.");
    newTotal = newTotal.slice(0, 3);
  }

  $total.textContent = newTotal;
});

$operations.addEventListener("click", (e) => {
  const currentOperation = e.target.textContent;
  calculate(currentOperation);
});

$modifier.addEventListener("click", (e) => {
  resetCalculator();
});
