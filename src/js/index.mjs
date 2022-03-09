const operatorFunctions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};
const operators = Object.keys(operatorFunctions);
/**
 *
 * @param {'+' | '-' | '*' | '/'} str
 * @returns {boolean}
 */
const isOperator = (str) => operators.includes(str);

const inputStore = [];

/**
 *
 * @param {Array<number | string>} inputs
 */
const calculate = (inputs) => {
  inputs.reduce(
    (acc, curr) => {
      const parsedValue = parseInt(curr, 10);

      if (Number.isNaN(parsedValue) && isOperator(curr)) {
        acc.operator = curr;
      }
      if (typeof curr === "number") {
        acc.prevSum = operatorFunctions[acc.operator](acc.prevSum, parsedValue);
      }
      return acc;
    },
    { prevSum: 0, operator: null }
  );
};
export default calculate;
