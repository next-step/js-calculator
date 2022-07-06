import { calculate } from './calculate.js';

export default class Calculator {
  _operation;
  _expression;
  _limit;

  constructor() {
    this._operation = '';
    this._expression = '0';
    this._limit = 3;
  }

  get expression() {
    return this._expression;
  }
  resetOperation = () => {
    this._operation = '';
  };
  resetExpression = () => {
    this._expression = '0';
  };
  resetDigitLimit = () => {
    this._limit = 3;
  };
  useDigitLimit = () => {
    this._limit = this._limit - 1;
  };

  addExpression = (value) => {
    this._expression = this._expression + value;
  };
  checkExpression = () => {
    if (this._expression === 'Infinity' || this._expression === 'NaN') {
      this.resetExpression();
    }
  };

  handleAC = () => {
    this.resetDigitLimit();
    this.resetOperation();
    this.resetExpression();
  };

  handleDigit = (digit) => {
    this.checkExpression();
    if (this._limit === 0) {
      alert('숫자는 세자리까지만 입력 가능합니다!');
      return;
    } else if (this._expression === '0') {
      this._expression = digit.toString();
    } else {
      this.addExpression(digit);
    }
    this.useDigitLimit();
  };

  handleOperation = (operation) => {
    this.checkExpression();
    if (operation === '=') {
      this.calculateExpression();
      this.resetOperation();
    } else if (this._operation === '') {
      this.addExpression(operation);
      this._operation = operation;
    } else if (this._limit === 3) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      return;
    } else {
      alert('두 개 이상의 숫자를 계산할 수 없습니다.');
      return;
    }
    this.resetDigitLimit();
  };

  calculateExpression = () => {
    let result;
    if (this._operation === '') {
      result = this._expression;
    } else {
      const { firstNumber, secondNumber } = this.splitNumbers();
      result = calculate(this._operation, firstNumber, secondNumber);
    }
    this._expression = result.toString();
  };

  splitNumbers = () => {
    let isNegative = false;
    if (this._expression.startsWith('-')) {
      isNegative = true;
      this._expression = this._expression.substring(1);
    }

    const numbers = this._expression.split(this._operation);
    const firstNumber = isNegative
      ? -parseInt(numbers[0])
      : parseInt(numbers[0]);
    const secondNumber = numbers[1] !== '' ? parseInt(numbers[1]) : 0;
    return { firstNumber, secondNumber };
  };
}
