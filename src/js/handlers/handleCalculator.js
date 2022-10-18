import {
  INITIAL_VALUE,
  ERROR_MESSAGES,
  OPERATORS,
} from "../utils/constants.js";
import { TOTAL } from "../utils/constants.js";
import { $ } from "../utils/dom.js";
import { operation } from "./operation.js";

export const handleCalculator = ({ target }) => {
  if (target.classList.contains("digit")) {
    handleDigit(target.textContent);
    return;
  }
  if (target.classList.contains("operation")) {
    handleOperation(target.textContent);
    return;
  }
  if (target.classList.contains("modifier")) {
    $(TOTAL).textContent = INITIAL_VALUE;
    return;
  }
};
let numberCount = 0;
const handleDigit = ($digit) => {
  // 숫자 입력시 0이 사라지도록

  if (numberCount >= 3) {
    alert(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
    return;
  }

  if (TOTAL.textContent === INITIAL_VALUE) {
    $(TOTAL).textContent = $digit;
  } else {
    $(TOTAL).textContent += $digit;
    numberCount++;
  }
};

const handleOperation = (operator) => {
  // 숫자가 입력되지 않은 상태라면 Invalid alert 뜨도록
  if (operator === "=") {
    getResult();
    return;
  } else {
    $(TOTAL).innerText += operator;
    return;
  }
};

const getResult = () => {
  const operator = $(TOTAL)
    .textContent.split("")
    .find((i) => OPERATORS.includes(i));
  const [num1, num2] = $(TOTAL).textContent.split(operator);
  $(TOTAL).textContent = operation({ num1, num2, operator });
};
