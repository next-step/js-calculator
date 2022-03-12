const operations = {
  '+': (numberA, numberB) => numberA + numberB,
  '-': (numberA, numberB) => numberA - numberB,
  '/': (numberA, numberB) => Math.trunc(numberA / numberB),
  '*': (numberA, numberB) => Math.trunc(numberA * numberB),
};

export default class Calculator {
  #numbers;
  #operators;

  constructor() {
    this.#numbers = [0];
    this.#operators = [];
  }

  inputNumber(numberText) {
    if (!this.#validateBeforeInputNumber()) return;

    const number = Number(numberText);

    if (this.#numbers.length > this.#operators.length)
      this.#buildNumber(number);
    else this.#appendNumber(number);
  }

  inputOperator(operator) {
    if (!this.#validateBeforeInputOperator()) return;

    if (operator === '=') return this.#calculateNumbers();

    this.#operators = this.#operators.concat([operator]);
  }

  /** numbers의 마지막 숫자를 만드는 메소드 */
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

    const calculated = this.#numbers.reduce((acc, number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index !== 1) return acc;

      const operator = this.#operators[index - 1];

      return operations[operator](acc, number);
    }, this.#numbers[0]);

    this.#numbers = [calculated];
    this.#operators = [];
  }

  #validateBeforeInputNumber() {
    if (
      this.#numbers.at(-1).toString().length >= 3 &&
      this.#numbers.length !== this.#operators.length
    ) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');

      return false;
    }

    return true;
  }

  #validateBeforeInputOperator() {
    if (
      (this.#numbers.length === 1 && this.#numbers[0] === 0) ||
      this.#numbers.length === this.#operators.length
    ) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');

      return false;
    }

    return true;
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
