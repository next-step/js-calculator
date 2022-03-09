export const operatorFunctions = Object.freeze({
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  X: (a, b) => a * b,
  "/": (a, b) => a / b,
});
export const operators = Object.freeze(Object.keys(operatorFunctions));
