import {
  CALCULATOR_SYMBOL_SUM,
  CALCULATOR_SYMBOL_SUBTRACT,
  CALCULATOR_SYMBOL_MULTIPLY,
  CALCULATOR_SYMBOL_DIVIDE,
} from './constants.js';

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
  const operations = {
    [CALCULATOR_SYMBOL_MULTIPLY]: (a, b) => a * b,
    [CALCULATOR_SYMBOL_DIVIDE]: (a, b) => a / b,
    [CALCULATOR_SYMBOL_SUM]: (a, b) => a + b,
    [CALCULATOR_SYMBOL_SUBTRACT]: (a, b) => a - b,
  };

  // 첫번째 값이 -인 경우 두번째 값을 -로 변환
  if (expressionArray[0] === CALCULATOR_SYMBOL_SUBTRACT) {
    expressionArray.splice(0, 1);
    expressionArray[1] = `${-expressionArray[1]}`;
  }

  // 사칙연산
  for (const operation in operations) {
    calculator(expressionArray, operation, operations[operation]);
  }

  return parseInt(expressionArray[0], 10);
}

export { calculate };
