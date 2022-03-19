import { Operator } from './constants.js';

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  if (secondOperand === 0) {
    alert('0으로 나눌 수 없습니다.');
    return 0;
  }
  return Math.floor(firstOperand / secondOperand);
}

export function calculate(operator, firstOperand, secondOperand) {
  return calculator.get(operator)(firstOperand, secondOperand);
}

export const calculator = new Map();

calculator.set(Operator.PLUS, add);
calculator.set(Operator.MINUS, subtract);
calculator.set(Operator.MULTIPLE, multiply);
calculator.set(Operator.DIVISION, divide);
