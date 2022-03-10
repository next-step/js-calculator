import { OPERATION } from "./constant.js";
import { isOver3Digits } from "./validateOperation.js";

function inputNumber(e) {
  const clickedNumber = e.target.innerText;
  const currentOperation = OPERATION.innerText;

  if (currentOperation === "0") {
    return (OPERATION.innerText = clickedNumber);
  }

  if (isOver3Digits()) {
    return (OPERATION.innerText += clickedNumber);
  }
}

export { inputNumber };
