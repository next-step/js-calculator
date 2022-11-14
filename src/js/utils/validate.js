import { MAX_DIGITS } from './constant.js';
import { ERROR_MESSAGES } from '../utils/constant.js';

export const checkExceedDigit = (digitCount) => {
  if (digitCount >= MAX_DIGITS) {
    throw Error(ERROR_MESSAGES.EXCEED_DIGITS);
  }
  return true;
};

export const checkCorrectOrder = (total) => {
  if (total === '') {
    throw Error(ERROR_MESSAGES.INCORRECT_INPUT_ORDER);
  }
  return true;
};

export const checkInitialState = ({ total, digitCount, operation }) => {
  return {
    total: total || '',
    digitCount: digitCount || 0,
    operation: operation || '',
  };
};
