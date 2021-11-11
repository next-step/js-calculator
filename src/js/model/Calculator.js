import Expression from "../constants/Expression.js";
import Message from "../constants/Message.js";

export default class Calculator {
  _currentNumber;
  _secondInserted;
  _expression;
  _buffer;
  _error;

  constructor() {
    this.clear();
  }

  setExpression(expression) {
    if (expression === Expression.calculate) {
      if (!this._buffer) {
        return true;
      }

      this._currentNumber = this.calculate();

      this._secondInserted = false;
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
    if (this._buffer) {
      this._secondInserted = true;
    } else {
      this._secondInserted = false;
    }

    if (!this.isAbleToSetNumber()) {
      return false;
    }

    this._currentNumber = +(this._currentNumber + "" + number);

    return true;
  }

  isAbleToSetExpression() {
    if (this._expression) {
      this._error = Message.aleradyExistExpression;
      return false;
    }

    if (this._currentNumber === 0) {
      this._error = Message.expressionValidationError;
      return false;
    }

    return true;
  }

  isAbleToSetNumber() {
    if (this._currentNumber >= 100) {
      this._error = Message.numberValidationError;
      return false;
    }

    return true;
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
    this._secondInserted = false;
    this._currentNumber = 0;
    this._expression = "";
    this._buffer = 0;
    this._error = "";
  }

  get result() {
    if (!this._expression) {
      return Math.floor(this._currentNumber);
    }

    return `${Math.floor(this._buffer)}${this._expression}${
      this._secondInserted ? Math.floor(this._currentNumber) : ""
    }`;
  }

  get error() {
    const error = this._error;

    this._error = "";
    return error;
  }
}
