import { calculate } from './calculate.js';
import { DIGIT_LIMIT } from './constants.js';
export default class Calculator {
  #operation;
  #expression;
  #limit;

  constructor() {
    this.#operation = '';
    this.#expression = '0';
    this.#limit = DIGIT_LIMIT;
  }

  get expression() {
    return this.#expression;
  }
  resetOperation = () => {
    this.#operation = '';
  };
  resetExpression = () => {
    this.#expression = '0';
  };
  resetDigitLimit = () => {
    this.#limit = DIGIT_LIMIT;
  };
  useDigitLimit = () => {
    this.#limit = this.#limit - 1;
  };

  addExpression = (value) => {
    this.#expression = this.#expression + value;
  };
  checkExpression = () => {
    if (this.#expression === 'Infinity' || this.#expression === 'NaN') {
      this.resetExpression();
    }
  };

  handleAC = () => {
    this.resetDigitLimit();
    this.resetOperation();
    this.resetExpression();
  };

  handleAppendDigit = (digit) => {
    this.checkExpression();
    if (this.#limit === 0) {
      alert('숫자는 세자리까지만 입력 가능합니다!');
      return;
    }

    this.useDigitLimit();
    if (this.#expression === '0') {
      this.#expression = digit.toString();
      return;
    }
    this.addExpression(digit);
  };

  handleOperation = (operation) => {
    this.checkExpression();
    if (operation === '=') {
      this.calculateExpression();
      this.resetOperation();
      this.resetDigitLimit();
      return;
    }

    if (this.#operation === '') {
      this.addExpression(operation);
      this.#operation = operation;
      this.resetDigitLimit();
      return;
    }

    if (this.#limit === DIGIT_LIMIT) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      return;
    }
    alert('두 개 이상의 숫자를 계산할 수 없습니다.');
  };

  calculateExpression = () => {
    let result;
    if (this.#operation === '') {
      result = this.#expression;
    } else {
      const { firstNumber, secondNumber } = this.splitNumbers();
      result = calculate(this.#operation, firstNumber, secondNumber);
    }
    this.#expression = result.toString();
  };

  splitNumbers = () => {
    let isNegative = false;
    if (this.#expression.startsWith('-')) {
      isNegative = true;
      this.#expression = this.#expression.substring(1);
    }

    const numbers = this.#expression.split(this.#operation);
    const firstNumber = isNegative
      ? -parseInt(numbers[0])
      : parseInt(numbers[0]);
    const secondNumber = numbers[1] !== '' ? parseInt(numbers[1]) : 0;
    return { firstNumber, secondNumber };
  };
}
