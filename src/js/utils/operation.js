import { OPERATORS } from "./constants";

export const operation = ({ num1, num2, operator }) => {
  const operators = {
    [OPERATORS.ADD]: () => Number(num1) + Number(num2),
    [OPERATORS.SUB]: () => Number(num1) - Number(num2),
    [OPERATORS.MUL]: () => Number(num1) * Number(num2),
    [OPERATORS.DIV]: () => Math.truc(Number(num1) / Number(num2)),
  };

  return operators[operator]();
};
