import { INITAL_VALUE, ERROR_MESSAGES, OPERATORS } from "../utils/constants.js";
import { TOTAL, DIGITS, OPERATIONS, ALLCLEAR } from "../utils/DOM.js";
import { isValidInput, isValidLength } from "./validator.js";

const displayDigit = (digit) => {
  if (isValidLength()) {
    TOTAL.textContent = digit;
    return;
  } else {
    alert(`${ERROR_MESSAGES.INVALID_DIGIT_LENGTH}`);
    return;
  }
};

const displayOperation = (operator) => {
  if (TOTAL.textContent == "=") {
    displayTotal();
    return;
  }

  if (isValidInput()) {
    TOTAL.textContent = operator;
  } else {
    alert(`${ERROR_MESSAGES.INVALID_INPUT}`);
    return;
  }
};

const displayTotal = () => {
  const operator = TOTAL.textContent
    .split("")
    .find((i) => OPERATORS.includes(i));
  const [num1, num2] = TOTAL.textContent.split(operator);
  calculaton({ num1, num2, operator });
};

// 하나의 함수가 여러 일을 하고 있다. -> 분리
export const handleCalClicked = ({ target }) => {
  if (target.classList.contains(".digit")) {
    displayDigit(target.textContent);
    return;
  }
  if (target.classList.contains(".operation")) {
    displayOperation(target.textContent);
    return;
  }
  if (target.classList.contains(".modifier")) {
    TOTAL.textContent = INITAL_VALUE;
    return;
  }
};
