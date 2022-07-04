export default class Calculator {
  _operation;
  _expression;
  _limit;

  constructor() {
    this._operation = '';
    this._expression = '0';
    this._limit = 3;
  }

  get operation() {
    return this._operation;
  }
  set operation(value) {
    this._operation = value;
  }
  get expression() {
    return this._expression;
  }
  set expression(value) {
    this._expression = value;
  }
  get limit() {
    return this._limit;
  }
  set limit(value) {
    this._limit = value;
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

  handleAC = () => {
    this.resetDigitLimit();
    this.resetOperation();
    this.resetExpression();
  };

  handleDigit = (digit) => {
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
    if (operation === '=') {
      this.calculateExpression();
      this.resetOperation();
    } else if (this.operation === '') {
      this.addExpression(operation);
      this._operation = operation;
    } else {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      return;
    }
    this.resetDigitLimit();
  };

  calculateExpression = () => {
    const numbers = this._expression.split(this._operation);
    const firstNumber = parseInt(numbers[0]);
    const secondNumber = parseInt(numbers[1]) ?? 0;
    const result = this.calculate(this._operation, firstNumber, secondNumber);
    this._expression = result;
  };

  calculate = (operation, firstNum, secondNum) => {
    switch (operation) {
      case '+':
        return this.plus(firstNum, secondNum);
      case '-':
        return this.minus(firstNum, secondNum);
      case 'X':
        return this.multiply(firstNum, secondNum);
      case '/':
        return this.divide(firstNum, secondNum);
    }
  };

  plus = (firstNum, secondNum) => {
    return firstNum + secondNum;
  };

  minus = (firstNum, secondNum) => {
    return firstNum - secondNum;
  };

  multiply = (firstNum, secondNum) => {
    return firstNum * secondNum;
  };

  divide = (firstNum, secondNum) => {
    return Math.floor(firstNum / secondNum);
  };
}
