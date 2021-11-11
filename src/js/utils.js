import { MathSymbol } from "./constants.js";

export function isArithmeticOperator(char) {
  switch (char) {
    case MathSymbol.Div:
    case MathSymbol.Mul:
    case MathSymbol.Plus:
    case MathSymbol.Minus:
      return true;
    default:
      return false;
  }
}

export function isDigit(char) {
  if (char.match(/^[0-9]$/g)) {
    return true;
  } else {
    return false;
  }
}

export function canInputArithmeticOperator(formula) {
  return formula?.length > 0 && isDigit(formula[formula.length - 1]);
}

export function getInputNumLen(formula) {
  if (!canInputArithmeticOperator(formula)) {
    return 0;
  }
  const numbers = formula.split(Object.keys(MathSymbol));
  if (numbers.length === 0) {
    return 0;
  }
  return numbers[numbers.length - 1].length;
}

export function calculate(formula) {
  const expression = formula.replaceAll(MathSymbol.Mul, "*");
  return `${Math.floor(new Function(`return ${expression}`)())}`;
}
