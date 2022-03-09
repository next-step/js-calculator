import {
  OPERATORS_SET,
  OPERATOR_ADD,
  OPERATOR_DIV,
  OPERATOR_MUL,
  OPERATOR_SUB,
  REGEXP_DIGIT,
  REGEXP_OPERATOR,
  INVALID_LENGTH,
  REQUIRED_DIGIT
} from "./constants.js";

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
    if (display === '0' && this.isOperator(keyword)) return true;
    const lastInput = display.charAt(display.length - 1);
    return [keyword, lastInput].filter(key => this.isOperator(key)).length === 2;
  }

  static isOverOperandLength(keyword, expressions) {
    if (this.isOperator(keyword)) return false;
    const firstOperand = expressions[0];
    const lastOperand = expressions[expressions.length - 1];
    if (lastOperand === undefined) return `${firstOperand}${keyword}`.length > 3;
    return `${lastOperand}${keyword}`.length > 3;
  }
}

class Calculator {
  constructor() {
    this.validator = Validator;
    this.priorityOperator = {
      [OPERATOR_ADD]: 2,
      [OPERATOR_SUB]: 2,
      [OPERATOR_MUL]: 1,
      [OPERATOR_DIV]: 1
    }
    this.keyMap = new Map([
      [OPERATOR_ADD, (left, right) => left + right],
      [OPERATOR_SUB, (left, right) => left - right],
      [OPERATOR_MUL, (left, right) => left * right],
      [OPERATOR_DIV, (left, right) => Math.floor(left / right)],
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
    if (keyword === '=') return this.#calculate(expressions.slice());
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
    while (expressions.length > 1) {
      let index = expressions.findIndex(item => this.priorityOperator[item] === 2);
      if (index === -1) index = expressions.findIndex(item => this.priorityOperator[item] === 1);
      const result = this.keyMap.get(expressions[index])(+expressions[index - 1], +expressions[index + 1]);
      expressions.splice(index - 1, 3, result);
    }

    return expressions[0];
  }
}

export default new Calculator();
