const operators = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  AC: 'AC',
  CALCULATE: '=',
};
const operatorPrecedences = {
  [operators.MULTIPLY]: 2,
  [operators.DIVIDE]: 2,
  [operators.ADD]: 1,
  [operators.SUBTRACT]: 1,
};
const operatorFunctions = {
  [operators.MULTIPLY]: (a, b) => b * a,
  [operators.DIVIDE]: (a, b) => b / a,
  [operators.ADD]: (a, b) => b + a,
  [operators.SUBTRACT]: (a, b) => b - a,
};
export const errorMessages = Object.freeze({
  SYNTAX_ERROR: '숫자를 먼저 입력한 후 연산자를 입력해주세요!',
  MAX_LENGTH_ERROR: '숫자는 세 자리까지만 입력 가능합니다!',
});

class Calculator {
  #buffer;

  #infix;

  #result;

  get result() {
    return this.#result;
  }

  constructor() {
    this.clearAll();
  }

  #calculate() {
    const postfix = Calculator.convertToPostfix(this.#infix);
    let result = Calculator.calculatePostfix(postfix);

    if (Number.isFinite(result)) result = parseInt(result, 10);

    this.#result = result;
    this.#buffer = result.toString();
    this.#infix = [];
  }

  #pushBuffer() {
    if (this.#buffer === '') return;

    this.#infix.push(this.#buffer);
    this.#buffer = '';
  }

  clearAll() {
    this.#buffer = '';
    this.#infix = [];
    this.#result = 0;
  }

  push(value) {
    // AC
    if (value === operators.AC) {
      this.clearAll();
      return;
    }

    // Ifinity or NaN
    if (!Number.isInteger(this.#result)) return;

    if (Number.isInteger(Number(value))) {
      if (this.#buffer.length >= 3)
        throw new Error(errorMessages.MAX_LENGTH_ERROR);

      this.#buffer = Calculator.removeLeadingZero(this.#buffer + value);
      return;
    }

    if (value === operators.CALCULATE) {
      this.#pushBuffer();
      this.#calculate();
      return;
    }

    if (this.#buffer === '') throw new Error(errorMessages.SYNTAX_ERROR);

    this.#pushBuffer();
    this.#infix.push(value);
  }

  toString() {
    return this.#infix.concat(this.#buffer).join('');
  }

  static convertToPostfix(infix) {
    const postfix = [];
    const stack = [];

    infix.forEach((value) => {
      if (Number.isInteger(+value)) {
        postfix.push(value);
        return;
      }

      while (
        stack.length > 0 &&
        operatorPrecedences[value] <=
          operatorPrecedences[stack[stack.length - 1]]
      ) {
        postfix.push(stack.pop());
      }

      stack.push(value);
    });

    return postfix.concat(stack.reverse());
  }

  static removeLeadingZero(numberString) {
    return Number(numberString).toString();
  }

  static calculatePostfix(postfix) {
    const stack = [];

    postfix.forEach((value) => {
      if (Number.isInteger(+value)) {
        stack.push(+value);
        return;
      }

      const fn = operatorFunctions[value];

      stack.push(fn(stack.pop(), stack.pop()));
    });

    return stack[0] ?? 0;
  }
}

export default Calculator;
