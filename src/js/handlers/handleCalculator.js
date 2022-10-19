import {
  INITIAL_VALUE,
  ERROR_MESSAGES,
  OPERATORS,
} from "../utils/constants.js";
import { Selectors } from "../utils/constants.js";
import { $ } from "../utils/dom.js";
import { operation } from "./operation.js";

let numberCount = 0;

export const handleCalculator = ({ target }) => {
  switch (target.classList[0]) {
    case "digit":
      handleDigit(target.textContent);
      return;
    case "operation":
      handleOperation(target.textContent);
      return;
    case "modifier":
      $(Selectors.TOTAL).textContent = INITIAL_VALUE;
      numberCount = 0;
      return;
  }
};

const handleDigit = (digit) => {
  if (numberCount >= 3) {
    alert(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
    throw new Error(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
  }

  const $total = $(Selectors.TOTAL);
  if ($total.textContent === INITIAL_VALUE) {
    $total.textContent = digit;
    numberCount++;
  } else {
    $total.textContent += digit;
    numberCount++;
  }
};

const handleOperation = (operator) => {
  if ($(Selectors.TOTAL).textContent === INITIAL_VALUE) {
    alert(ERROR_MESSAGES.INVALID_INPUT);
    throw new Error(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
  }

  if (operator === "=") {
    getResult();
    numberCount = 0;
    return;
  }
  $(Selectors.TOTAL).innerText += operator;

  return;
};

const getResult = () => {
  const operator = $(Selectors.TOTAL)
    .textContent.split("")
    .find((i) => OPERATORS.includes(i));
  const [num1, num2] = $(Selectors.TOTAL).textContent.split(operator);
  $(Selectors.TOTAL).textContent = operation({ num1, num2, operator });
};
