import {
  CALCULATOR_SYMBOL_SUM,
  CALCULATOR_SYMBOL_SUBTRACT,
  CALCULATOR_SYMBOL_MULTIPLY,
  CALCULATOR_SYMBOL_DIVIDE,
} from './constants.js';

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtract(a, b) {
  return a - b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divide(a, b) {
  return a / b;
}

/**
 * @param {string} expression
 * @returns {number}
 */
function calculate(expression) {
  const regExp = /(\+|\-|\X|\/)/;
  const expressionArray = expression.split(regExp);
  /**
   * @param {array} array
   * @param {'X' | '/' | '+' | '-'} symbol
   * @param {function} fn
   */
  const calculator = (array, symbol, fn) => {
    while (array.includes(symbol)) {
      const index = array.indexOf(symbol);
      const result = fn(Number(array[index - 1]), Number(array[index + 1]));
      array[index] = `${result}`;
      array.splice(index + 1, 1);
      array.splice(index - 1, 1);
    }
  };

  // 첫번째 값이 -인 경우 두번째 값을 -로 변환
  if (expressionArray[0] === CALCULATOR_SYMBOL_SUBTRACT) {
    expressionArray.splice(0, 1);
    expressionArray[1] = `${-expressionArray[1]}`;
  }

  calculator(expressionArray, CALCULATOR_SYMBOL_MULTIPLY, multiply);
  calculator(expressionArray, CALCULATOR_SYMBOL_DIVIDE, divide);
  calculator(expressionArray, CALCULATOR_SYMBOL_SUM, sum);
  calculator(expressionArray, CALCULATOR_SYMBOL_SUBTRACT, subtract);

  return parseInt(expressionArray[0], 10);
}

export { calculate };
