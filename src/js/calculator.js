import { OPERATOR, MODIFIER, MSG } from './common/define.js';

const warnMsg = msg => alert(msg);

export default class Calculator {
  constructor(container) {
    this.maxNum = 999;
    this.valueList = [];
    this.container = container;
    this.total = this.container.querySelector('.total');
    this.addEvent();
  }
  addEvent() {
    const digits = this.container.querySelector('.digits');
    const operations = this.container.querySelector('.operations');
    const modifiers = this.container.querySelector('.modifiers');

    digits.addEventListener('click', this.clickDigit.bind(this));
    operations.addEventListener('click', this.clickOperation.bind(this));
    modifiers.addEventListener('click', this.clickModifier.bind(this));
  }
  clickDigit(e) {
    const digit = +e.target.textContent;
    if (isNaN(digit)) {
      return;
    }

    const last = this.valueList[this.valueList.length -1];
    if (!last || isNaN(last)) {
      this.valueList.push(digit);
    } else {
      const tempNum = +`${last}${digit}`;
      if (tempNum > this.maxNum) {
        warnMsg(MSG.OVER_MAX_NUM);
      } else {
        this.valueList[this.valueList.length -1] = tempNum;
      }
    }

    this.setTotal();
  }
  clickOperation(e) {
    if (!this.valueList.length) {
      return;
    }

    const operator = e.target.textContent;
    const last = this.valueList[this.valueList.length -1];
    if (isNaN(last)) {
      this.valueList[this.valueList.length - 1] = operator;
    } else if (operator === OPERATOR.EQUAL || this.valueList.length > 2) {
      this.calculate();
    } else {
      this.valueList.push(operator);
    }

    this.setTotal();
  }
  clickModifier(e) {
    const modifier = e.target.textContent;
    if (modifier === MODIFIER.AC) {
      this.valueList = [];
      this.setTotal();
    }
  }
  calculate() {
    const valueList = this.valueList;
    if (valueList.length < 3) {
      return;
    }

    const [num1, operator, num2] = valueList;
    if (operator === OPERATOR.DIVIDED && num2 === 0) {
      warnMsg(MSG.NOT_ALLOW_DIVIDED_BY_0);
      return;
    }

    const calculation = {
      [OPERATOR.PLUS]: (num1, num2) => (num1 + num2),
      [OPERATOR.MINUS]: (num1, num2) => (num1 - num2),
      [OPERATOR.MULTIPLIED]: (num1, num2) => (num1 * num2),
      [OPERATOR.DIVIDED]: (num1, num2) => (Math.floor(num1 / num2)),
    }
    this.valueList = [calculation[operator](num1, num2)];
  }
  setTotal() {
    this.total.textContent = this.valueList.length ? this.valueList.join(' ') : 0;
  }
}
