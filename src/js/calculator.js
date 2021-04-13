'use strict';

import { $ } from './utils/dom.js';
import {
  MESSAGE,
  OPERATORS,
  PLUS,
  MINUS,
  MULTIPLICATION,
  DIVISION,
} from './utils/constants.js';

export default class Calculator {
  constructor() {
    this.$total = $('#total');
    this.$calculator = $('.calculator');
    this.$calculator.addEventListener('click', this.onClickBtn);
    this.formula = '';
  }

  onClickBtn = ({ target }) => {
    if (target.matches('.digit')) {
      this.renderDigit(target.innerText);
      return;
    }
    if (target.matches('.modifier')) {
      this.clearView();
      return;
    }
    if (target.matches('.operation')) {
      this.renderOperator(target.innerText);
      return;
    }
  };

  renderDigit(digit) {
    if (this.formula === '0') this.formula = '';
    if (!this.isValidDigit()) {
      alert(MESSAGE.MAX_NUMBER);
      return;
    }
    this.formula += digit;
    this.$total.innerText = this.formula;
    this.isValidDigit();
  }

  renderOperator(operator) {
    if (operator === '=') {
      this.calcFormula();
      return;
    }
    if (!this.isValidNumberOfOperator()) {
      alert(MESSAGE.MAX_OPERATION);
      return;
    }
    this.formula += operator;
    this.$total.innerText = this.formula;
  }

  clearView() {
    this.formula = '0';
    this.$total.innerText = this.formula;
  }

  calcFormula() {
    console.log('calcFormula');
    const operator = this.formula
      .split('')
      .find(value => OPERATORS.includes(value));
    const numbers = this.formula.split(operator);
    const num1 = Number(numbers[0]);
    const num2 = Number(numbers[1]);
    const res = this.calculate(num1, num2, operator);
    this.clearView();
    this.renderDigit(res);
  }

  isValidNumberOfOperator() {
    const operators = this.formula
      .split('')
      .filter(value => OPERATORS.includes(value));
    if (operators.length >= 1) {
      return false;
    }
    return true;
  }

  isValidDigit() {
    const operator = this.formula
      .split('')
      .find(value => OPERATORS.includes(value));
    const numbers = this.formula.split(operator);
    const number = numbers.pop();
    if (number.length >= 3) {
      return false;
    }
    return true;
  }

  calculate(num1, num2, operator) {
    const operation = {
      [PLUS]: (num1, num2) => num1 + num2,
      [MINUS]: (num1, num2) => num1 - num2,
      [MULTIPLICATION]: (num1, num2) => num1 * num2,
      [DIVISION]: (num1, num2) => Math.floor(num1 / num2),
    };
    return operation[operator](num1, num2, operator);
  }
}
