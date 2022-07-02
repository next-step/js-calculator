import { MAX_DIGIT_LENGTH, OPERATORS } from "../utils/constants";
import { TOTAL } from "../utils/DOM";

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
