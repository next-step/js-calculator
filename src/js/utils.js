import { OPERATIONS } from './constants.js';

export const $ = (selector, el = document) => el.querySelector(selector);

export const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;

export const operation = {
  [OPERATIONS.ADD]: (a, b) => a + b,
  [OPERATIONS.SUBTRACT]: (a, b) => a - b,
  [OPERATIONS.MULTIFLY]: (a, b) => a * b,
  [OPERATIONS.DIVIDE]: (a, b) => Math.trunc(a / b),
};
