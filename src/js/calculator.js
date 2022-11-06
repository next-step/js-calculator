class Calculator {
  constructor(operand1 = '', operand2 = '', operator = '') {
    this.operand1 = operand1;
    this.operand2 = operand2;
    this.operator = operator;
  }

  add() {
    return Number(this.operand1) + Number(this.operand2);
  }

  sub() {
    return Number(this.operand1) - Number(this.operand2);
  }

  mul() {
    return Number(this.operand1) * Number(this.operand2);
  }

  reset() {
    this.operand1 = '';
    this.operand2 = '';
    this.operator = '';
  }

  toString() {
    return this.operand1 + this.operator + this.operand2;
  }
}

export const calculator = new Calculator();
