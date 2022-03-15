import { OPERATION } from "./constant.js";
import { getUsedOperator } from "./validateOperation.js";
import calculateOperation from "./calculateOperation.js";

function inputOperator(e) {
  const clickedOperator = e.target.innerText;
  const currentOperation = OPERATION.innerText;

  if (clickedOperator === "=") {
    calculateOperation();
    return;
  }

  if (currentOperation === "0") {
    alert("숫자 값을 먼저 입력하세요.");
    return false;
  }

  if (getUsedOperator()) {
    alert("+, -, x, / 연산자는 한 번만 입력 가능합니다.");
    return false;
  }

  return (OPERATION.innerText += clickedOperator);
}

export { inputOperator };
