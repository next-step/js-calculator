import {
  ADD_OPERATOR,
  DIVIDE_OPERATOR,
  POW_OPERATOR,
  SUBTRACT_OPERATOR,
} from './constants/operator.js';

function sum(total, value) {
  return total + value;
}

function subtract(total, value) {
  return total - value;
}

function pow(total, value) {
  return total * value;
}

function divide(total, value) {
  return total / value;
}

export default function calculate({ total, value, operator } = {}) {
  if (total === undefined || value === undefined || operator === undefined) {
    return total;
  }

  if (typeof value !== 'number' || typeof total !== 'number') {
    throw new TypeError('ONLY SUPPORT NUMBER TYPE');
  }

  switch (operator) {
    case ADD_OPERATOR:
      return sum(total, value);
    case SUBTRACT_OPERATOR:
      return subtract(total, value);
    case POW_OPERATOR:
      return pow(total, value);
    case DIVIDE_OPERATOR:
      return divide(total, value);
    default:
      throw new Error('NOT SUPPORT OPERATOR');
  }
}
