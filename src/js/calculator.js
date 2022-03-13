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

  if (operator === ADD_OPERATOR) {
    return sum(Number(total), Number(value));
  }

  if (operator === SUBTRACT_OPERATOR) {
    return subtract(Number(total), Number(value));
  }

  if (operator === POW_OPERATOR) {
    return pow(Number(total), Number(value));
  }

  if (operator === DIVIDE_OPERATOR) {
    return divide(Number(total), Number(value));
  }

  throw new Error('NOT SUPPORT OPERATOR');
}
