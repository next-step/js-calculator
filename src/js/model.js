class Model {
  constructor() { 
    this.currentNumber = '';
    this.currentOperator = '';
    this.numberStack = [];
    this.operatorStack = [];
  }

  initializeCurrentNumber() {
    this.currentNumber = ''
  }

  setCurrentNumber(num) {
    this.currentNumber += num;
  }

  getCurrentNumber() {
    const digit = Number.parseInt(this.currentNumber);
    this.numberStack.push(digit);
    return digit;
  }

  setCurrentOperator(operator) {
    this.initializeCurrentNumber()
    this.currentOperator = operator;
  }

  getCurrentOperator() {
    this.operatorStack.push(this.currentOperator);
    return this.currentOperator;
  }

  getTotal() {
    const operator = this.operatorStack.pop();
    const num1 = this.numberStack.pop();
    const num2 = this.numberStack.pop();
    if (operator === '+') {
      return num1 + num2;
    }
  }
}
