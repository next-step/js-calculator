import { OPERATION } from "./constant.js";
import { is3DigitsOrLess } from "./validateOperation.js";

function inputNumber(e) {
  const clickedNumber = e.target.innerText;
  const currentOperation = OPERATION.innerText;

  if (currentOperation === "0") {
    return (OPERATION.innerText = clickedNumber);
  }

  if (is3DigitsOrLess()) {
    return (OPERATION.innerText += clickedNumber);
  }
}

export { inputNumber };
