class Model {
  _num1;
  _operation;
  _num2;

  constructor() {}

  setNum1(number) {
    this._num1 = number;
  }

  setNum2(number) {
    this._num2 = number;
  }

  setOperation(operation) {
    this._operation = operation;
  }

  calculate() {
    return operators[this._operation](num1, num2);
  }

  reset() {
    this._num1 = undefined;
    this._num2 = undefined;
    this._operation = undefined;
  }

  getInfo() {
    return {
      num1: this._num1,
      num2: this._num2,
      operation: this._operation,
    };
  }
}

const operators = {
  add: (num1, num2) => num1 + num2,
  minus: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => Math.floor(num1 / num2),
};
