class Model {
  constructor() {
    this.currentNumber = '';
    this.currentOperator = '';
    this.numberStack = [];
    this.operatorStack = [];
    this.total = 0;
  }

  initializeCurrentNumber() {
    this.currentNumber = '';
  }

  initializeCurrentOperator() {
    this.currentOperator = '';
  }

  initializeNumberStack() {
    this.numberStack.length = 0;
  }

  initializeOperatorStack() {
    this.operatorStack.length = 0;
  }

  setCurrentNumber(num) {
    if (this.currentNumber.length >= 3) {
      return;
    }
    this.currentNumber += num;
  }

  getCurrentNumber() {
    const digit = Number.parseInt(this.currentNumber);
    this.numberStack.push(digit);
    return digit;
  }

  setCurrentOperator(operator) {
    this.initializeCurrentNumber();
    if (!this.numberStack.length) {
      this.numberStack.push(0);
    }
    if (this.operatorStack.length) {
      this.initializeOperatorStack();
    }
    this.currentOperator = operator;
    this.operatorStack.push(this.currentOperator);
  }

  getCurrentOperator() {
    return this.currentOperator;
  }

  setTotal(total) {
    this.total = total;
  }

  getTotal() {
    return this.total;
  }

  calculate() {
    if (this.operatorStack.length === 1 && this.numberStack.length === 2) {
      const operator = this.operatorStack.pop();
      const num1 = this.numberStack.pop();
      const num2 = this.numberStack.pop();
      
      switch (operator) {
        case OPERATOR.PLUS:
          this.setTotal(num2 + num1);
          break;
        case OPERATOR.MINUS:
          this.setTotal(num2 - num1);
          break;
        case OPERATOR.MULTIPLY:
          this.setTotal(num2 * num1);
          break;
        case OPERATOR.DIVIDE:
          this.setTotal(Math.trunc(num2 / num1));
          break;
      }

      this.numberStack.push(this.getTotal());
    }
  }

  reset() {
    this.total = 0;
    this.initializeCurrentNumber();
    this.initializeCurrentOperator();
    this.initializeNumberStack();
    this.initializeOperatorStack();
  }
}
