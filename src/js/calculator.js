class Calculator {
  operand1 = 0;

  operand2 = 0;

  operator = '';

  add() {
    return Number(this.operand1) + Number(this.operand2);
  }

  sub() {
    return Number(this.operand1) - Number(this.operand2);
  }

  mul() {
    return Number(this.operand1) * Number(this.operand2);
  }

  div() {
    return Math.trunc(Number(this.operand1) / Number(this.operand2));
  }

  reset() {
    this.operand1 = '';
    this.operand2 = '';
    this.operator = '';
  }

  toString() {
    return (this.operand1 || '') + this.operator + (this.operand2 || '');
  }
}

const calculator = new Calculator();

export default calculator;
