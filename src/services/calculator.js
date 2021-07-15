import { MESSAGE } from '../constants/constants.js';
import { $ } from '../utils/util.js';

export default class Calculator {
  constructor() {
    this.stack = [];
    this.calculate = {
      '+': (number1, number2) => number1 + number2,
      '-': (number1, number2) => number1 - number2,
      X: (number1, number2) => number1 * number2,
      '/': (number1, number2) => parseInt(number1 / number2),
    };
  }

  isNumber(value) {
    return /\d+/.test(value);
  }

  displayTotal() {
    let text = '';
    for (let i = 0; i < this.stack.length; i++) {
      text += this.stack[i];
    }
    $('#total').textContent = text === '' ? 0 : text;
  }

  clickNumber({ target }) {
    const newNumber = target.textContent;

    // 스택이 비어있으면 숫자 추가, 스택의 마지막이 연산자면 숫자 추가
    if (!this.stack.length || !this.isNumber(this.stack[this.stack.length - 1])) {
      this.stack.push(newNumber);
      this.displayTotal();
      return;
    }

    // 숫자데이터 변형
    let number = this.stack.pop();
    // 숫자 추가 불가한 경우 - 최대 숫자 길이 넘음
    if (number.length >= 3) {
      this.stack.push(number);
      alert(MESSAGE.MAX_NUMBER_ERROR);
      return;
    }

    if (number === 0) number = '';
    number += newNumber;
    this.stack.push(number);
    this.displayTotal();
  }

  clickOperation({ target }) {
    const operation = target.textContent;

    // 숫자가 없는데 연산자를 클릭할 경우
    if (!this.stack.length && operation !== '=') {
      alert(MESSAGE.NONE_OPERATION_WITHOUT_NUMBER_ERROR);
      return;
    }

    // 사칙연산인 경우
    if (operation !== '=') {
      this.stack.push(operation);
      this.displayTotal();
      return;
    }

    // = 클릭시 수식 계산
    // stack 에 3개 이상 없으면 계산하면 안됨.
    if (this.stack.length < 3) {
      if (!isNumber(this.stack[this.stack.length - 1])) this.stack.pop(); // 연산자 제거
      this.displayTotal();
      return;
    }

    // 연산 수행
    const number2 = this.stack.pop();
    const oper = this.stack.pop();
    const number1 = this.stack.pop();

    const result = this.calculate[oper](+number1, +number2);
    this.stack.push(result);
    this.displayTotal();
    return;
  }

  clickAllClear() {
    while (this.stack.length) {
      this.stack.pop();
    }
    this.displayTotal();
  }
}
