export default class Calculator {
  constructor() {
    this.numbers = [0];
    this.operators = [];
    this.operatings = {
      '+': (numberA, numberB) => numberA + numberB,
      '-': (numberA, numberB) => numberA - numberB,
      '/': (numberA, numberB) => Math.floor(numberA / numberB),
      '*': (numberA, numberB) => Math.floor(numberA * numberB),
    };
  }

  /** view 단에서 join 하여 렌더링할 numbers 와 operators의 배열을 만드는 메소드 */
  getNumberAndOperators() {
    let numberAndOperators = [];

    this.numbers.forEach((number, index) => {
      if (this.operators[index]) {
        numberAndOperators = numberAndOperators.concat([
          number,
          this.operators[index],
        ]);

        return;
      }

      numberAndOperators = numberAndOperators.concat([number]);
    });

    return numberAndOperators;
  }

  /** input된 numberText를 처리하기 전에 실행하는 validate 메소드 */
  validateNumberText(numberText) {
    if (
      this.numbers[this.numbers.length - 1].toString().length >= 3 &&
      this.numbers.length !== this.operators.length
    ) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');

      return false;
    }

    if (isNaN(Number(numberText))) return false;

    return true;
  }

  /** 연산의 대상이 되는 numberText를 number로 바꿔 numbers 배열의 마지막 원소에 더하는 메소드 */
  inputNumber(numberText) {
    if (!this.validateNumberText(numberText)) return;

    const number = Number(numberText);

    if (this.numbers.length > this.operators.length) this.buildNumber(number);
    else this.appendNumber(number);
  }

  /** numbers의 마지막 숫자를 만드는 메소드 */
  buildNumber(number) {
    const copiedNumbers = [...this.numbers];

    copiedNumbers[copiedNumbers.length - 1] =
      copiedNumbers[copiedNumbers.length - 1] * 10 + number;

    this.numbers = copiedNumbers;
  }

  appendNumber(number) {
    this.numbers = this.numbers.concat([number]);
  }

  inputOperator(operator) {
    if (this.numbers.length === this.operators.length)
      return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');

    if (operator === '=') return this.operateNumbers();

    this.operators = this.operators.concat([operator]);
  }

  /** numbers을 연산하는 메소드 */
  operateNumbers() {
    // 2개 숫자 이상의 긴 연산에 대비한 반복문 로직

    const calculated = this.numbers.reduce((acc, number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index === 0 || index > 1) return acc;

      const operator = this.operators[index - 1];

      return this.operatings[operator](acc, number);
    }, this.numbers[0]);

    this.numbers = [calculated];
    this.operators = [];
  }

  /** numbers와 Operators를 비우는 메소드 */
  clearNumbersAndOperators() {
    this.numbers = [0];
    this.operators = [];
  }
}
