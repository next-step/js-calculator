class Calculator {
  constructor(num1, num2) {
    this.num1 = Number(num1);
    this.num2 = Number(num2);
  }

  sum() {
    return this.num1 + this.num2;
  }

  substract() {
    return this.num1 - this.num2;
  }

  multiply() {
    return this.num1 * this.num2;
  }

  divide() {
    return Math.floor(this.num1 / this.num2);
  }
}

export default Calculator;
