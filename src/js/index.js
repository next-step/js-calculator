"use strict";

const $total = document.querySelector("#total");
const $digits = document.querySelector(".digits");
const $operations = document.querySelector(".operations");
const $modifier = document.querySelector(".modifier");

let isOperationClicked = false;
let isOperator2In = false; // 두번째 인자가 들어왔는지 체크
let operator1 = 0;
let operator2 = 0;
let operation = "";
let result = 0;

const initCalculator = () => {
  isOperationClicked = false;
  isOperator2In = false;
  operator1 = 0;
  operator2 = 0;
  operation = "";
  result = 0;
  $total.textContent = "0";
};

// 결과창에 보여줄 숫자 제어
const showTotalNumber = (currentTotal, nextNumber) => {
  let newTotal = "";

  if (isOperationClicked && !isOperator2In) {
    newTotal = nextNumber;
    isOperator2In = true;
  } else if (isOperationClicked && isOperator2In) {
    newTotal = currentTotal + nextNumber;
  } else {
    if (currentTotal === "0") {
      newTotal = nextNumber;
    } else {
      newTotal = currentTotal + nextNumber;
    }
  }

  return newTotal;
};

const calculate = (currentOperation) => {
  // 연산자 연속 클릭 방지
  if (isOperationClicked && currentOperation !== "=") {
    return;
  } else if (currentOperation === "=") {
    operator2 = parseInt($total.textContent);

    switch (operation) {
      case "+":
        result = operator1 + operator2;
        break;
      case "-":
        result = operator1 - operator2;
        break;
      case "X":
        result = operator1 * operator2;
        break;
      case "/":
        result = operator1 / operator2;
        break;
    }
    operator1 = result; // 지금까지 결과값을 op1에 저장한다
    $total.textContent = Math.floor(result);

    isOperator2In = false;
    isOperationClicked = false;
  } else {
    operation = currentOperation;
    operator1 = parseInt($total.textContent);

    isOperationClicked = true;
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
  initCalculator();
});
