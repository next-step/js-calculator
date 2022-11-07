export default class Calculator {
  constructor() {
    this.prev = '';
    this.current = '';
    this.operation = null;
    this.isOperating = false;
    this.total = document.getElementById('total');

    this.setEventHandler();
  }

  sum(num1, num2) {
    return +num1 + +num2;
  }

  subtract(num1, num2) {
    return +num1 - +num2;
  }

  multiple(num1, num2) {
    return +num1 * +num2;
  }

  divide(num1, num2) {
    const res = +num1 / +num2;
    return Math.floor(res);
  }

  setEventHandler() {
    const digits = document.querySelector('.digits');
    const modifiers = document.querySelector('.modifiers');
    const operations = document.querySelector('.operations');

    digits?.addEventListener('click', (e) => this.setDigit(e));
    modifiers?.addEventListener('click', () => this.reset());
    operations?.addEventListener('click', (e) => this.setOperator(e));
  }

  setDigit(e) {
    const value = e.target.innerHTML;

    if ('0' === value && !this.prev) {
      return;
    }

    if (!this.isOperating && this.prev?.length < 3) {
      this.prev += value;
      this.total.innerHTML = this.prev;

      return;
    }

    if ('0' === value && '0' === this.current) {
      return;
    }

    if (this.isOperating && this.current?.length < 3) {
      this.current += value;
      this.total.innerHTML = this.current;
    }
  }

  setOperator(e) {
    const value = e.target.innerHTML;
    let result;

    if ('=' !== value) {
      this.isOperating = true;
      this.operation = value;

      return;
    }

    switch (this.operation) {
    case '+':
      result = this.sum(this.prev, this.current);
      break;

    case '-':
      result = this.subtract(this.prev, this.current);
      break;

    case 'X':
      result = this.multiple(this.prev, this.current);
      break;

    case '/':
      result = this.divide(this.prev, this.current);
      break;

    default:
      return;
    }

    this.prev = '';
    this.current = '';
    this.operation = null;
    this.isOperating = false;
    this.total.innerHTML = String(result);
  }

  reset() {
    this.prev = '';
    this.current = '';
    this.operation = null;
    this.isOperating = false;
    this.total.innerHTML = '0';
  }
}
