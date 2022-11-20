import Operate from './operate.js';
import { Operation } from '../common/enum.js';

export default class Calculator {
  prev = '';
  current = '';
  operation = null;
  isOperating = false;

  constructor() {
    this.operate = new Operate();
    this.total = document.getElementById('total');

    this.setEventHandler();
  }

  setEventHandler() {
    const digits = document.querySelector('.digits');
    const modifiers = document.querySelector('.modifiers');
    const operations = document.querySelector('.operations');

    digits.addEventListener('click', this.clickDigit);
    modifiers.addEventListener('click', () => this.reset());
    operations.addEventListener('click', this.clickOperator);
  }

  clickDigit = (e) => {
    const value = e.target.innerHTML;

    if ('0' === value && (!this.prev || '0' === this.current)) {
      return;
    }

    if (!this.isOperating && this.prev?.length < 3) {
      this.prev += value;
      this.total.innerHTML = this.prev;

      return;
    }

    if (this.isOperating && this.current?.length < 3) {
      this.current += value;
      this.total.innerHTML = this.current;
    }
  };

  clickOperator = (e) => {
    const value = e.target.innerHTML;
    let result;

    if ('=' !== value) {
      this.isOperating = true;
      this.operation = value;

      return;
    }

    switch (this.operation) {
    case Operation.PLUS:
      result = this.operate.sum(this.prev, this.current);
      break;

    case Operation.MINUS:
      result = this.operate.subtract(this.prev, this.current);
      break;

    case Operation.MULTIPLICATION:
      result = this.operate.multiple(this.prev, this.current);
      break;

    case Operation.DIVISION:
      result = this.operate.divide(this.prev, this.current);
      break;

    default:
      return;
    }

    this.reset(String(result));
  };

  reset(total = '0') {
    this.prev = '';
    this.current = '';
    this.operation = null;
    this.isOperating = false;
    this.total.innerHTML = total;
  }
}
