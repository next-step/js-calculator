import { DISPLAY } from '../utils/DOM.js';
import { OPERATORS } from '../utils/constant.js';

export const putResult = () => {
  const displayValue = DISPLAY.innerText;
  const operator = displayValue.split('').find((v) => OPERATORS.includes(v));
  const operands = displayValue.split(operator);
  const operations = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    X: (a, b) => Number(a) * Number(b),
    '/': (a, b) => Math.floor(Number(a) / Number(b)),
  };
  if (operands.length === 1) {
    return;
  }
  DISPLAY.innerText = operations[operator](
    Number(operands[0]),
    Number(operands[1]),
  );
};
