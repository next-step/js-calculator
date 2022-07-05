import {
  INITIAL_VALUE,
  MAX_DIGIT_LENGTH,
  OPERATORS,
} from "../utils/constants.js";
import { TOTAL } from "../utils/DOM.js";

// 브라우저에서 독립적으로 만들어주기
export const isValidDigitLength = (e) => {
  const displayInput = e.textContent;
  const operator = displayInput.split("").find((i) => OPERATORS.includes(i));

  if (!operator) {
    return displayInput.length < MAX_DIGIT_LENGTH;
  }

  return displayInput.split(operator)?.pop().length < MAX_DIGIT_LENGTH;
};

export const isAbleOperator = (e) => {
  const displayInput = e.textContent;
  if (displayInput === INITIAL_VALUE) {
    return false;
  }
  return !Number.isNaN(typeof displayInput[displayInput.length - 1]);
};
