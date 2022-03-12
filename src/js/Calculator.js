import { $, calculate } from './utils.js';
import { OPERATOR } from './constants.js';
import { isOverMaxNumber } from './validation.js';

export default class Calculator {
  constructor() {
    this.num1 = '';
    this.num2 = '';
    this.operator = null;

    this.$total = $('#total');
    this.$modifier = $('.modifiers');
    this.$digits = $('.digits');
    this.$operations = $('.operations');
  }

  init() {
    this.setEvents();
  }

  setEvents() {
    this.$digits.addEventListener('click', this.clickDigits);
    this.$operations.addEventListener('click', this.clickOperators);
    this.$modifier.addEventListener('click', this.clickModifier);
  }

  clickDigits = (e) => {
    const digit = e.target.textContent;

    if (!this.num1) this.firstClickDigit();

    if (this.operator) {
      if (!isOverMaxNumber(this.num2)) {
        this.num2 += digit;
        this.showTotal(digit);
      }
    } else {
      if (!isOverMaxNumber(this.num1)) {
        this.num1 += digit;
        this.showTotal(digit);
      }
    }
  };

  clickOperators = (e) => {
    const operator = e.target.textContent;

    if (OPERATOR.EQUAL === operator) {
      const result = calculate(this.num1, this.num2, this.operator);
      this.showResult(result);
      this.resetData();
    } else {
      this.$total.textContent += operator;
      this.operator = operator;
    }
  };

  clickModifier = () => {
    this.resetData();
    this.resetTotal();
  };

  resetData = () => {
    this.num1 = '';
    this.num2 = '';
    this.operator = null;
  };

  resetTotal = () => {
    this.$total.textContent = '0';
  };

  showResult = (value) => {
    this.$total.textContent = String(value);
  };

  firstClickDigit = () => {
    this.$total.textContent = '';
  };

  showTotal = (value) => {
    this.$total.textContent += String(value);
  };
}
