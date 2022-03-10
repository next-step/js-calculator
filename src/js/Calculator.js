const operations = {
  '+': (numberA, numberB) => numberA + numberB,
  '-': (numberA, numberB) => numberA - numberB,
  '/': (numberA, numberB) => Math.floor(numberA / numberB),
  '*': (numberA, numberB) => Math.floor(numberA * numberB),
};

export default class Calculator {
  constructor() {
    this.numbers = [0];
    this.operators = [];
  }

  /** numberText를 number로 바꾸어 입력하는 메소드 */
  inputNumber(numberText) {
    if (!this._validateNumberText(numberText)) return;

    const number = Number(numberText);

    if (this.numbers.length > this.operators.length) this._buildNumber(number);
    else this._appendNumber(number);
  }

  /** operators에 operator를 입력하는 메소드. 그러나 '=' 가 입력될 시 연산을 시작한다. */
  inputOperator(operator) {
    if (!this._validateBeforeInputOperator()) return;

    if (operator === '=') return this._operateNumbers();

    this.operators = this.operators.concat([operator]);
  }

  /** numbers의 마지막 숫자를 만드는 메소드 */
  _buildNumber(number) {
    const copiedNumbers = [...this.numbers];

    copiedNumbers[copiedNumbers.length - 1] =
      copiedNumbers.at(-1) * 10 + number;

    this.numbers = copiedNumbers;
  }

  /** numbers에 새로운 number를 추가하는 메소드 */
  _appendNumber(number) {
    this.numbers = this.numbers.concat([number]);
  }

  /** numbers을 연산하는 메소드 */
  _operateNumbers() {
    // 2개 숫자 이상의 긴 연산에 대비한 반복문 로직

    const calculated = this.numbers.reduce((acc, number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index === 0 || index > 1) return acc;

      const operator = this.operators[index - 1];

      return operations[operator](acc, number);
    }, this.numbers[0]);

    this.numbers = [calculated];
    this.operators = [];
  }

  /** input된 numberText를 처리하기 전에 실행하는 validate 메소드 */
  _validateNumberText(numberText) {
    if (
      this.numbers.at(-1).toString().length >= 3 &&
      this.numbers.length !== this.operators.length
    ) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');

      return false;
    }

    if (isNaN(Number(numberText))) return false;

    return true;
  }

  /** operator를 입력하기 전에 실행하는 validate 메소드 */
  _validateBeforeInputOperator() {
    if (
      (this.numbers.length === 1 && this.numbers[0] === 0) ||
      this.numbers.length === this.operators.length
    ) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');

      return false;
    }

    return true;
  }

  /** view 단에서 join 하여 렌더링할 numbers 와 operators의 배열을 만드는 메소드 */
  getNumberAndOperators() {
    const numberAndOperators = this.numbers.map((number, index) => {
      if (this.operators[index]) {
        return [number, this.operators[index]];
      }

      return number;
    });

    return numberAndOperators.flat();
  }

  /** numbers와 Operators를 비우는 메소드 */
  clearNumbersAndOperators() {
    this.numbers = [0];
    this.operators = [];
  }
}
