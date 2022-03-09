import { INVALID_LENGTH, OPERATORS_SET, REGEXP_DIGIT, REGEXP_OPERATOR, REQUIRED_DIGIT } from "./constants.js";

class Validator {
  static isNotKeypad(target) {
    return ['.digit', '.modifier', '.operation'].filter(key => target.matches(key)).length < 1;
  }

  static isDigit(keyword) {
    return REGEXP_DIGIT.test(keyword);
  }

  static isOperator(keyword) {
    return OPERATORS_SET.has(keyword);
  }

  static isDuplicatedOperator(keyword, display) {
    const lastInput = display.charAt(display.length - 1);
    return [keyword, lastInput].filter(key => this.isOperator(key)).length === 2;
  }

  static isOverOperandLength(keyword, [left, _, right]) {
    if (this.isOperator(keyword)) return false;
    if (right === undefined) return `${left}${keyword}`.length > 3;
    return `${right}${keyword}`.length > 3;
  }
}

class Calculator {
  constructor() {
    this.validator = Validator;
    this.keyMap = new Map([
      ['+', (left, right) => left + right],
      ['-', (left, right) => left - right],
      ['X', (left, right) => left * right],
      ['/', (left, right) => Math.floor(left / right)],
    ]);

    document.querySelector('.calculator').addEventListener('click', this.#handler.bind(this));
  }

  #handler({ target }) {
    if (this.validator.isNotKeypad(target)) return;
    const keyword = target.textContent;
    this.#render(keyword);
  }

  #render(keyword) {
    const $total = document.querySelector('#total');
    $total.textContent = this.#parseKeyword(keyword, $total.textContent);
  }

  #parseKeyword(keyword, display) {
    if (keyword === 'AC') return '0';

    const expressions = display.split(REGEXP_OPERATOR);
    if (keyword === '=') return this.#calculate(expressions);
    if (display === '0' && this.validator.isDigit(keyword)) return keyword;

    if (this.validator.isDuplicatedOperator(keyword, display)) {
      alert(REQUIRED_DIGIT);
      return display;
    };

    if (this.validator.isOverOperandLength(keyword, expressions)) {
      alert(INVALID_LENGTH);
      return display;
    }

    return display + keyword;
  }

  #calculate(expressions) {
    if (expressions.length <= 1) return expressions[0];
    const [left, operator, right] = expressions;
    return this.keyMap.get(operator)(Number(left), Number(right));
  }
}

export default new Calculator();
