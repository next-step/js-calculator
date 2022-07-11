import {
  operatorRegex,
  mergeState,
  findOperator,
} from './lib.js';

export function calculate(state) {
  const [num1, num2] = mergeState(state).split(operatorRegex);
  const operator = findOperator(state);
  switch(operator) {
    case '+': {
      return sum(num1, num2);
    }
    case '-': {
      return subtract(num1, num2);
    }
    case 'X': {
      return multiply(num1, num2);
    }
    case '/': {
      return divide(num1, num2);
    }
    default: 
      return '해당 연산자가 없습니다.'
  }
}

export function sum(num1, num2) {
  return Number(num1) + Number(num2);
}

export function subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

export function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

export function divide(num1, num2) {
  return Math.floor(Number(num1) / Number(num2));
}
