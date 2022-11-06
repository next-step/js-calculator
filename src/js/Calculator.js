class Calculator {
  num1 = 0;
  num2 = 0;
  op = null;
  current = 0;

  add(n, m) {
    return n + m;
  }
  subtract(n, m) {
    return n - m;
  }
  multiply(n, m) {
    return n * m;
  }
  divide(n, m) {
    return Math.floor(n / m);
  }

  initialize() {
    this.num1 = 0;
    this.num2 = 0;
    this.op = null;
    this.current = 0;
  }
}

export default Calculator;
