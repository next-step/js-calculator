import { OPERATOR } from './constants.js';

export const $ = (selector) => document.querySelector(selector);

export const calculate = (num1, num2, operator) => {
  switch (operator) {
    case OPERATOR.PLUS:
      return +num1 + +num2;
    case OPERATOR.MINUS:
      return +num1 - +num2;
    case OPERATOR.MULTIPLY:
      return +num1 * +num2;
    case OPERATOR.DIVIDE:
      return Math.floor(num1 / num2);
    default:
      return num1;
  }
};
