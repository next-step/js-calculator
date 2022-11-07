import { MAX_DIGITS } from './constant.js';

export const checkExceedDigit = (digitCount) => {
  if (digitCount >= MAX_DIGITS) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return false;
  }
  return true;
};

export const checkCorrectOrder = (total) => {
  if (total === '') {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return false;
  }
  return true;
};
