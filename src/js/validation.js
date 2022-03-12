import { MAX_LENGTH } from './constants.js';

export const INVALID_LENGTH = `숫자는 ${MAX_LENGTH}자리까지만 입력 가능합니다!`;

export const isOverMaxNumber = (operators) => {
  if (operators.length > MAX_LENGTH - 1) {
    alert(INVALID_LENGTH);
    return true;
  }

  return false;
};
