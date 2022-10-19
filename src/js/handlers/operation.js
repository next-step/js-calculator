import { ADD, SUB, MUL, DIV } from "../utils/constants.js";

export const operation = ({ num1, num2, operator }) => {
  const operators = {
    [ADD]: () => Number(num1) + Number(num2),
    [SUB]: () => Number(num1) - Number(num2),
    [MUL]: () => Number(num1) * Number(num2),
    [DIV]: () => (Number(num1) / Number(num2)).toFixed(2),
  };

  return operators[operator]();
};
