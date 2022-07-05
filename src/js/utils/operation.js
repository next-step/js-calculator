import { ADD, SUB, MUL, DIV } from "./constants.js";

export const operation = ({ num1, num2, operator }) => {
  const operators = {
    [ADD]: () => Number(num1) + Number(num2),
    [SUB]: () => Number(num1) - Number(num2),
    [MUL]: () => Number(num1) * Number(num2),
    [DIV]: () => Math.truc(Number(num1) / Number(num2)),
  };

  return operators[operator]();
};
