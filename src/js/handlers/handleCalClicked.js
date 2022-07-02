import { INITIAL_VALUE, ERROR_MESSAGES, OPERATORS } from "../utils/constants";
import { TOTAL, DIGITS, OPERATIONS, ALLCLEAR } from "../utils/DOM";
import { isValidInput, isValidLength } from "./validator";

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
  const nums = TOTAL.textContent.split(operator);
  const num1 = nums[0];
  const num2 = nums[1];
  calculaton({ num1, num2, operator });
};

export const handleCalClicked = ({ target }) => {
  if (target.clasList.contains(".digit")) {
    displayDigit(target.textContent);
    return;
  }
  if (target.classList.contains(".operation")) {
    displayOperation(target.textContent);
    return;
  }
  if (target.classList.contains(".modifier")) {
    TOTAL.textContent = INITIAL_VALUE;
    return;
  }
};
