class Model {
  constructor() { 
    this.currentNumber = '';
    this.currentOperator = '';
    this.numberStack = [];
    this.operatorStack = [];
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
    this.initializeCurrentNumber()
    this.currentOperator = operator;
  }

  getCurrentOperator() {
    this.operatorStack.push(this.currentOperator);
    return this.currentOperator;
  }

  setTotal(total) {
    this.total = total;
  }

  getTotal() {
    return this.total;
  }

  calculate() {
    if (this.operatorStack.length === 1) {
      const operator = this.operatorStack.pop();
      const num1 = this.numberStack.pop();
      const num2 = this.numberStack.pop();
      
      if (operator === OPERATOR.PLUS) {
        this.setTotal(num1 + num2);
        
      } else if(operator === OPERATOR.MINUS) {
        this.setTotal(num2 - num1);
      }

      this.numberStack.push(this.getTotal());
    }
  }

  reset() {
    this.total = 0;
    this.initializeCurrentNumber()
    this.initializeCurrentOperator();
    this.initializeNumberStack();
    this.initializeOperatorStack();
  }
}
