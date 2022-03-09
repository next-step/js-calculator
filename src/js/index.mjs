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
  const { prevSum: total } = inputs.reduce(
    (acc, curr) => {
      const parsedValue = parseInt(curr, 10);

      if (isOperator(curr)) {
        acc.operator = curr;
        return acc;
      }

      if (acc.prevSum === null) {
          acc.prevSum = parsedValue;
          return acc;
      }

      if (acc.operator) {
        acc.prevSum = operatorFunctions[acc.operator](acc.prevSum, parsedValue);
        return acc;
      }

      acc.prevSum = acc.prevSum * 10 + parsedValue;
      return acc;
    },
    { prevSum: null, operator: null }
  );

  return total;
};
export default calculate;
