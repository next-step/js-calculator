const PLUS = '+';
const SUBSTRACT = '-';
const DIVIDE = '/';
const MUTIPLY = '*';
const EQUAL = '=';

const operations = {
  [PLUS]: (numberA, numberB) => numberA + numberB,
  [SUBSTRACT]: (numberA, numberB) => numberA - numberB,
  [DIVIDE]: (numberA, numberB) => Math.trunc(numberA / numberB),
  [MUTIPLY]: (numberA, numberB) => Math.trunc(numberA * numberB),
};

export default class Calculator {
  #numbers;
  #operators;

  constructor() {
    this.#numbers = [0];
    this.#operators = [];
  }

  get numbers() {
    return this.#numbers;
  }

  get operators() {
    return this.#operators;
  }

  inputNumber(numberText) {
    const number = Number(numberText);

    if (this.#numbers.length > this.#operators.length)
      this.#buildNumber(number);
    else this.#appendNumber(number);
  }

  inputOperator(operator) {
    if (operator === EQUAL) return this.#calculateNumbers();

    this.#operators = this.#operators.concat([operator]);
  }

  /** numbers의 마지막 숫자의 자릿수를 증가시키는 메소드 */
  #buildNumber(number) {
    const copiedNumbers = [...this.#numbers];

    copiedNumbers[copiedNumbers.length - 1] =
      copiedNumbers.at(-1) * 10 + number;

    this.#numbers = copiedNumbers;
  }

  /** numbers에 새로운 number를 추가하는 메소드 */
  #appendNumber(number) {
    this.#numbers = this.#numbers.concat([number]);
  }

  #calculateNumbers() {
    // 2개 숫자 이상의 긴 연산에 대비한 반복문 로직

    const calculatedNumber = this.#numbers.reduce((acc, number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index !== 1) return acc;

      const operator = this.#operators[index - 1];

      return operations[operator](acc, number);
    }, this.#numbers[0]);

    this.#numbers = [calculatedNumber];
    this.#operators = [];
  }

  getNumbersAndOperators() {
    const numbersAndOperators = this.#numbers.reduce((acc, number, index) => {
      if (this.#operators[index])
        return acc.concat(number, this.#operators[index]);

      return acc.concat(number);
    }, []);

    return numbersAndOperators;
  }

  clearNumbersAndOperators() {
    this.#numbers = [0];
    this.#operators = [];
  }
}
