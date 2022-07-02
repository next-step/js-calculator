import { DIGIT_LENGTH_LIMIT, OPERATORS, OPERATION_EXECUTOR, OPERATOR_REGEXP, INITIAL_VALUE } from './constants.js';

class Calculator {
  #total = document.querySelector('#total');

  #checkDigitLength() {
    const [operand1, operator, operand2] = this.#total.textContent.split(OPERATOR_REGEXP);
    if ((!operator && operand1.length >= DIGIT_LENGTH_LIMIT) || (operator && operand2.length >= DIGIT_LENGTH_LIMIT)) {
      throw new Error('최대 연산 가능 자릿수는 3자리입니다.');
    }
  }

  #removeZero() {
    const operands = this.#total.textContent.split(OPERATOR_REGEXP);
    const isValueZero = operands.length > 1 && !operands[operands.length - 1];
    if (isValueZero) return;
    if (operands.includes(INITIAL_VALUE)) {
      const index = operands.lastIndexOf(INITIAL_VALUE);
      operands.splice(index, 1);
      this.#total.textContent = operands.join('');
      return;
    }
  }

  #hasOperator() {
    return OPERATOR_REGEXP.test(this.#total.textContent);
  }

  #onDigitClick(number) {
    this.#checkDigitLength();
    this.#removeZero();
    this.#total.textContent += number;
  }

  #onOperatorClick(operator) {
    if (operator === OPERATORS.EQUAL) return this.#calculate();
    if (this.#hasOperator()) {
      const changeOperator = this.#total.textContent.replace(OPERATOR_REGEXP, operator);
      this.#total.textContent = changeOperator;
      return;
    }
    this.#total.textContent += operator;
  }

  #onModifierClick() {
    this.#total.textContent = INITIAL_VALUE;
  }

  #calculate() {
    if (!this.#hasOperator()) throw new Error('연산자를 입력해 주세요');
    const [operand1, _, operand2] = this.#total.textContent.split(OPERATOR_REGEXP);
    const result = OPERATION_EXECUTOR[this.#total.textContent.match(OPERATOR_REGEXP)](operand1, operand2);
    if (!isFinite(result)) {
      this.#total.textContent = '오류';
      throw new Error('연산 오류');
    }
    this.#total.textContent = result;
  }

  routeEvent({ target: { className, textContent } }) {
    switch (className) {
      case 'digit':
        this.#onDigitClick(textContent);
        break;
      case 'operation':
        this.#onOperatorClick(textContent);
        break;
      case 'modifier':
        this.#onModifierClick();
        break;
    }
  }
}

export default Calculator;
