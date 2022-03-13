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
function multuply(a, b) {
  return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divid(a, b) {
  return a / b;
}

/**
 * @param {string} ceremony
 * @returns {number}
 */
function calculate(ceremony) {
  const regExp = /(\+|\-|\X|\/)/;
  const ceremonyArray = ceremony.split(regExp);
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
  if (ceremonyArray[0] === '-') {
    ceremonyArray.splice(0, 1);
    ceremonyArray[1] = `${-ceremonyArray[1]}`;
  }

  calculator(ceremonyArray, 'X', multuply);
  calculator(ceremonyArray, '/', divid);
  calculator(ceremonyArray, '+', sum);
  calculator(ceremonyArray, '-', subtract);

  return Math.floor(ceremonyArray[0]);
}

export { calculate };
