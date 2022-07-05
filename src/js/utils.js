import { MAX_INPUT_LENGTH } from './constants';

const isOverLength = (input) => (input && (`${input}`).length > MAX_INPUT_LENGTH);

const calculatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => y && x / y,
};

const defaultCalculatorFunction = (x, y) => y ?? x;

function calculate(operator, accumulator, number) {
  return (calculatorFunctions[operator] || defaultCalculatorFunction)(accumulator, number);
}

export {
  isOverLength,
  calculatorFunctions,
  defaultCalculatorFunction,
  calculate,
};
