import {
  OPERATION,
  NUMBER_INPUT_MAX_LENGTH,
  ERROR_MESSAGE,
} from "./constants.js";

const $total = document.querySelector("#total");
const $digits = document.querySelector(".js-digits");
const $modifier = document.querySelector(".js-modifier");
const $operation = document.querySelector(".js-operation");

let leftValue = null;
let rightValue = null;
let operation = null;
let isOperationUpdated = false;

// left update
// left = 기존 left + input

// right update
// right = 기존 right + input

$digits.addEventListener("click", (event) => {
  const inputVal = Number(event.target.dataset.digit);

  // 연산자를 눌렀을 때
  // 오른쪽 숫자를 누를때
  if (isOperationUpdated) {
    if ((rightValue ?? 0).toString().length >= NUMBER_INPUT_MAX_LENGTH) {
      alert(ERROR_MESSAGE.DIGIT_MAX_LENGTH);
      return;
    }

    rightValue = (rightValue ?? 0) * 10 + inputVal;
    $total.textContent = rightValue;
  }
  // 왼쪽 숫자 누를떄
  else {
    if ((leftValue ?? 0).toString().length >= NUMBER_INPUT_MAX_LENGTH) {
      alert(ERROR_MESSAGE.DIGIT_MAX_LENGTH);
      return;
    }

    leftValue = (leftValue ?? 0) * 10 + inputVal;
    $total.textContent = leftValue;
  }
});

// 화살표함수
// function() {}
// () => {}

$modifier.addEventListener("click", (event) => {
  $total.textContent = 0;
  leftValue = null;
  rightValue = null;
  operation = null;
  isOperationUpdated = false;
});
// 1 => leftValue
// + => operation
// 2 => rightValue
// = => 여기!! exucute!!
// 3

const executeOper = {
  [OPERATION.PLUS]: (leftValue, rightValue) => leftValue + rightValue,
  [OPERATION.MINUS]: (leftValue, rightValue) => leftValue - rightValue,
  [OPERATION.MULTIPLY]: (leftValue, rightValue) => leftValue * rightValue,
  [OPERATION.DIVIDE]: (leftValue, rightValue) =>
    Math.floor(leftValue / rightValue),
};

// 숫자 입력: 1 => leftValue 저장
// 연산자 입력: + => operation 저장
// 숫자입력: 2 => rightValue 저장
// 연산자 입력: = => 1 + 2를 계산
// executeOper에서 operation(+)에 해당하는 함수를 꺼내온다
// left, right로 함수를 실행한다.

const calculate = () => {
  if (rightValue === 0) {
    $total.textContent = ERROR_MESSAGE.DIVIDE_ZERO;
    return;
  }

  if (rightValue === null) {
    rightValue = leftValue;
  }

  $total.textContent = executeOper[operation](leftValue, rightValue);
  leftValue = null;
  rightValue = null;
  operation = null;
  isOperationUpdated = false;
};

$operation.addEventListener("click", (event) => {
  const clickedOper = event.target.dataset.oper;
  if (clickedOper == OPERATION.EQUAL) {
    calculate();
  }
  // 사칙 연산이 들어갔을 때
  else {
    if (rightValue !== null) {
      calculate();
    }

    if (leftValue === null) {
      leftValue = Number($total.textContent) || 0;
    }

    operation = clickedOper;
    isOperationUpdated = true;
  }
});

// +를 눌렀는데
// 아직 left가 없다?
// 그럼 기존 결과를 left에 넣고 넘어가자!

// oper 클릭 발생!
// 만약 "=" 면 => excute
// 만약 나머지면 => ...

// currentTarget => 이벤트리스너가 달려있는 곳
// target => 실제로 이벤트가 일어난 곳

// cypress!!
// 예외처리
// 리팩터링!
