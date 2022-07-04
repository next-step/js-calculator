export const DEFAULT_NUMBER = "0";
export const MAX_DIGIT_LENGTH = 3;
export const operators = {
  "+": (op1, op2) => op1 + op2,
  "-": (op1, op2) => op1 - op2,
  X: (op1, op2) => op1 * op2,
  "/": (op1, op2) => Math.floor(op1 / op2),
};
