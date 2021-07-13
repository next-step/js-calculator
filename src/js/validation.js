import { MAX_NUMBER, MESSAGE } from "./constants.js";

export const isOverMaxNumber = (operators) => {
  if (operators.length > MAX_NUMBER - 1) {
    alert(MESSAGE.MAX_NUMBER_OVER);
    return true;
  }

  return false;
};
