import {
  OPERATOR_ADD,
  OPERATOR_DIV,
  OPERATOR_MUL,
  OPERATOR_SUB,
  REGEXP_OPERATOR,
  INVALID_LENGTH,
  REQUIRED_DIGIT,
  OPERATORS_SET,
  REGEXP_DIGIT,
  OPERATOR_ZERO,
  OPERATOR_AC,
  OPERATOR_EQU
} from "./constants.js";

class Validator {
  isNotKeypad(target) {
    return !['.digit', '.modifier', '.operation'].some(key => target.matches(key));
  }

  isDigit(keyword) {
    return REGEXP_DIGIT.test(keyword);
  }

  isOperator(keyword) {
    return OPERATORS_SET.has(keyword);
  }

  isOnlyZero(keyword) {
    return keyword === OPERATOR_ZERO;
  }

  isAC(keyword) {
    return keyword === OPERATOR_AC;
  }

  isEquation(keyword) {
    return keyword === OPERATOR_EQU;
  }

  isFirstDigitInput(keyword, display) {
    return this.isOnlyZero(display) && this.isDigit(keyword);
  }

  isDuplicatedOperator(keyword, display) {
    if (this.isOnlyZero(display)) return true;
    const lastInput = display.charAt(display.length - 1);
    return [keyword, lastInput].every(key => this.isOperator(key));
  }

  isOverOperandLength(keyword, expressions) {
    if (this.isOperator(keyword)) return false;
    const firstOperand = expressions[0];
    const lastOperand = expressions.at(-1);
    if (lastOperand === undefined) return `${firstOperand}${keyword}`.length > 3;
    return `${lastOperand}${keyword}`.length > 3;
  }

  isAddition(operator) {
    return operator === OPERATOR_ADD;
  }

  isSubtraction(operator) {
    return operator === OPERATOR_SUB;
  }

  isValidOperand(operator, operand) {
    if (this.isAddition(operator) || this.isSubtraction(operator)) return operand;
    return operand || 1;
  }
}

class Calculator {
  #validator = new Validator();
  #statement = [];
  #priorityOperator = {
    [OPERATOR_ADD]: 1,
    [OPERATOR_SUB]: 1,
    [OPERATOR_MUL]: 2,
    [OPERATOR_DIV]: 2
  }
  #operatingSystem = new Map([
    [OPERATOR_ADD, (left, right) => left + right],
    [OPERATOR_SUB, (left, right) => left - right],
    [OPERATOR_MUL, (left, right) => left * right],
    [OPERATOR_DIV, (left, right) => Math.truc(left / right)],
  ]);

  get #expression() {
    return this.#statement;
  }

  set #expressionParser(expression) {
    this.#statement = expression;
    return this.#statement;
  }

  constructor() {
    document.querySelector('.calculator').addEventListener('click', this.#renderPannel.bind(this));
  }

  #renderPannel({ target: $eventTarget }) {
    if (this.#validator.isNotKeypad($eventTarget)) return;
    const $total = document.querySelector('#total');
    const keyword = $eventTarget.textContent;
    $total.textContent = this.parseKeyword(keyword, $total.textContent);
  }

  parseKeyword(keyword, display) {
    if (this.#validator.isAC(keyword)) return '0';

    this.#expressionParser = display.split(REGEXP_OPERATOR);

    if (this.#validator.isEquation(keyword)) return this.calculate();
    if (this.#validator.isFirstDigitInput(keyword, display)) return keyword;
    if (this.#validator.isDuplicatedOperator(keyword, display)) {
      alert(REQUIRED_DIGIT);
      return display;
    };

    if (this.#validator.isOverOperandLength(keyword, this.#expression)) {
      alert(INVALID_LENGTH);
      return display;
    }

    return display + keyword;
  }

  calculate() {
    const expressions = this.#expression;
    if (expressions.length <= 1) return expressions[0];
    while (expressions.length > 1) {
      const { operatorIndex, leftOperand, operator, rightOperand } = this.getParsedExpression();
      const compute = this.#operatingSystem.get(operator);
      const verifiedRightOperand = this.#validator.isValidOperand(operator, rightOperand);
      const result = compute(leftOperand, verifiedRightOperand);
      expressions.splice(operatorIndex - 1, 3, result);
    }

    return expressions[0];
  }

  getParsedExpression() {
    const expressions = this.#expression;
    const index = this.getOperatorIndex();
    return {
      operatorIndex: index,
      leftOperand: +expressions[index - 1],
      operator: expressions[index],
      rightOperand: +expressions[index + 1]
    }
  }

  getOperatorIndex() {
    const operatorIndex = this.findOperatorPriorityIndex(2);
    return operatorIndex === -1 ? this.findOperatorPriorityIndex(1) : operatorIndex;
  }

  findOperatorPriorityIndex(priority) {
    return this.#expression.findIndex(expression => this.#priorityOperator[expression] === priority);
  }
}

export default new Calculator();
