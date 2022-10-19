import {
  INITIAL_VALUE,
  ERROR_MESSAGES,
  OPERATORS,
} from "../utils/constants.js";
import { TOTAL } from "../utils/constants.js";
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
      $(TOTAL).textContent = INITIAL_VALUE;
      numberCount = 0;
      return;
  }
};

const handleDigit = ($digit) => {
  if (numberCount >= 3) {
    alert(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
    throw new Error(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
  }

  if ($(TOTAL).textContent === INITIAL_VALUE) {
    $(TOTAL).textContent = $digit;
    numberCount++;
  } else {
    $(TOTAL).textContent += $digit;
    numberCount++;
  }
};

const handleOperation = ($operator) => {
  if ($(TOTAL).textContent === INITIAL_VALUE) {
    alert(ERROR_MESSAGES.INVALID_INPUT);
    throw new Error(ERROR_MESSAGES.INVALID_DIGIT_LENGTH);
  }

  if ($operator === "=") {
    getResult();
    numberCount = 0;
    return;
  }
  $(TOTAL).innerText += $operator;

  return;
};

const getResult = () => {
  const operator = $(TOTAL)
    .textContent.split("")
    .find((i) => OPERATORS.includes(i));
  const [num1, num2] = $(TOTAL).textContent.split(operator);
  $(TOTAL).textContent = operation({ num1, num2, operator });
};
