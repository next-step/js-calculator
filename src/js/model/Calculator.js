import Expression from "../constants/Expression.js";

export default class Calculator {
  _currentNumber;
  _expression;
  _buffer;

  constructor() {
    this.clear();
  }

  setExpression(expression) {
    if (expression === Expression.calculate) {
      if (!this._buffer) {
        return true;
      }

      this._currentNumber = this.calculate();

      this._expression = "";
      this._buffer = 0;

      return true;
    }

    if (!this.isAbleToSetExpression()) {
      return false;
    }

    this._expression = expression;
    this._buffer = this._currentNumber;
    this._currentNumber = 0;

    return true;
  }

  setNumber(number) {
    if (!this.isAbleToSetNumber()) {
      return false;
    }

    this._currentNumber = +(this._currentNumber + "" + number);

    return true;
  }

  isAbleToSetExpression() {
    if (this._currentNumber === 0) {
      return false;
    }

    return !this._expression;
  }

  isAbleToSetNumber() {
    return this._currentNumber < 100;
  }

  calculate() {
    switch (this._expression) {
      case Expression.plus:
        return this._buffer + this._currentNumber;

      case Expression.minus:
        return this._buffer - this._currentNumber;

      case Expression.multiply:
        return this._buffer * this._currentNumber;

      case Expression.devide:
        return this._buffer / this._currentNumber;

      default:
        throw Error("Invalid Expression!");
    }
  }

  clear() {
    this._currentNumber = 0;
    this._expression = "";
    this._buffer = 0;
  }

  get result() {
    if (!this._expression) {
      return Math.floor(this._currentNumber);
    }

    return `${Math.floor(this._buffer)}${this._expression}${
      this._currentNumber ? Math.floor(this._currentNumber) : ""
    }`;
  }
}
