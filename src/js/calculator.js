import { OPERATOR, MODIFIER } from './common/define.js';

const warnMsg = msg => alert(msg);

export default class Calculator {
  constructor(container) {
    this.maxNum = 999;
    this.valueList = [];
    this.container = container;
  }
  init() {
    this.digits = this.container.getElementsByClassName('digit');
    this.operations = this.container.getElementsByClassName('operation');
    this.modifiers = this.container.getElementsByClassName('modifier');
    this.total = this.container.getElementsByClassName('total')[0];
    this.addEvent();
  }
  addEvent() {
    for (let ix = 0; ix < this.digits.length; ix++) {
      this.digits[ix].addEventListener('click', this.clickDigit.bind(this));
    }
    for (let ix = 0; ix < this.operations.length; ix++) {
      this.operations[ix].addEventListener('click', this.clickOperation.bind(this));
    }
    for (let ix = 0; ix < this.modifiers.length; ix++) {
      this.modifiers[ix].addEventListener('click', this.clickModifier.bind(this));
    }
  }
  clickDigit(e) {
    const digit = +e.target.textContent;
    const valueList = this.valueList;
    if (isNaN(digit)) {
      return;
    }

    if (!valueList.length) {
      valueList.push(digit);
    } else {
      const last = valueList[valueList.length -1];
      if (isNaN(last)) {
        valueList.push(digit);
      } else {
        const tempNum = +(last.toString() + digit.toString());
        if (tempNum > 999) {
          warnMsg('계산기 최대 입력값은 999입니다');
        } else {
          valueList[valueList.length -1] = tempNum;
        }
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
    } else if (operator === OPERATOR.EQUAL) {
      this.calculate();
    } else {
      if (this.valueList.length > 2) {
        this.calculate();
      }
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
    let result;

    switch (operator) {
      case OPERATOR.PLUS:
        result = num1 + num2;
        break;
      case OPERATOR.MINUS:
        result = num1 - num2;
        break;
      case OPERATOR.MULTIPLIED:
        result = num1 * num2;
        break;
      case OPERATOR.DIVIDED:
        result = Math.floor(num1 / num2);
        break;
      default:
        break;
    }

    this.valueList = [result];
  }
  setTotal() {
    let result;
    if (!this.valueList.length) {
      result = 0;
    } else {
      result = this.valueList.join(' ');
    }

    this.total.textContent = result;
  }
}
