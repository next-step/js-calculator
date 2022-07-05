import { MAX_DIGIT_LENGTH, OPERATORS } from "../utils/constants.js";
import { TOTAL } from "../utils/DOM.js";

// 브라우저에서 독립적으로 만들어주기
export const isValidLength = () => {
  const displayInput = TOTAL.textContent;
  const operator = displayInput.split("").find((i) => OPERATORS.includes(i));

  if (!operator) {
    return displayInput.length < MAX_DIGIT_LENGTH;
  }
};

export const isValidInput = () => {
  return true;
};
