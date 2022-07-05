import {
  INITIAL_VALUE,
  ERROR_MESSAGES,
  OPERATORS,
} from "../utils/constants.js";
import { TOTAL, DIGITS, OPERATIONS, ALLCLEAR } from "../utils/DOM.js";
import { isAbleOperator, isValidDigitLength } from "./validator.js";
import { operation } from "../utils/operation.js";

const displayDigit = (digit) => {
  if (!isValidDigitLength(TOTAL)) {
    alert(`${ERROR_MESSAGES.INVALID_DIGIT_LENGTH}`);
    return;
  }
  if (TOTAL.textContent === INITIAL_VALUE) {
    TOTAL.textContent = digit;
  } else {
    TOTAL.textContent += digit;
  }
};

const displayOperation = (operator) => {
  if (operator === "=") {
    displayTotal();
    return;
  }

  if (isAbleOperator(TOTAL)) {
    TOTAL.innerText += operator;
    return;
  }
  alert(`${ERROR_MESSAGES.INVALID_INPUT}`);
  return;
};

const displayTotal = () => {
  const operator = TOTAL.textContent
    .split("")
    .find((i) => OPERATORS.includes(i));
  const [num1, num2] = TOTAL.textContent.split(operator);
  TOTAL.textContent = operation({ num1, num2, operator });
};

// 하나의 함수가 여러 일을 하고 있다. -> 분리
export const handleCalClicked = ({ target }) => {
  if (target.classList.contains("digit")) {
    displayDigit(target.textContent);
    return;
  }
  if (target.classList.contains("operation")) {
    displayOperation(target.textContent);
    return;
  }
  if (target.classList.contains("modifier")) {
    TOTAL.textContent = INITIAL_VALUE;
    return;
  }
};
