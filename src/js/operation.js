export const add = (num1, num2) => {
  return num1 + num2;
};

export const subtract = (num1, num2) => {
  return num1 - num2;
};

export const mutiply = (num1, num2) => {
  return num1 * num2;
};

export const divide = (num1, num2) => {
  return Math.floor(num1 / num2);
};

export const operations = {
  X: mutiply,
  '/': divide,
  '+': add,
  '-': subtract,
};
