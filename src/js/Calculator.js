export default class Calculator {
  constructor() {
    this.inputNumbers = [0];
    this.operators = [];
    this.operatings = {
      '+': (numberA, numberB) => numberA + numberB,
      '-': (numberA, numberB) => numberA - numberB,
      '/': (numberA, numberB) => Math.floor(numberA / numberB),
      '*': (numberA, numberB) => Math.floor(numberA * numberB),
    };
  }

  getNumberAndOperators() {
    let numberAndOperators = [];

    this.inputNumbers.forEach((number, index) => {
      if (this.operators[index]) {
        numberAndOperators = numberAndOperators.concat([
          number,
          this.operators[index],
        ]);

        return;
      }

      numberAndOperators = numberAndOperators.concat([number]);
    });

    console.log(numberAndOperators);

    return numberAndOperators;
  }

  /** 연산의 대상이 되는 numberText를 number로 바꿔 inputNumbers 배열의 마지막 원소에 더하는 메소드 */
  inputNumber(numberText) {
    if (
      this.inputNumbers[this.inputNumbers.length - 1].toString().length >= 3
    ) {
      return alert('숫자는 세 자리까지만 입력 가능합니다!');
    }

    if (!isNaN(Number(numberText))) {
      const copiedNumbers = [...this.inputNumbers];

      copiedNumbers[copiedNumbers.length - 1] =
        copiedNumbers[copiedNumbers.length - 1] * 10 + Number(numberText);

      this.inputNumbers = copiedNumbers;
    }
  }

  /** number들을 연산하는 메소드 */
  operateNumbers() {
    // 2개 숫자 이상의 긴 연산에 대비한 반복문 로직

    const calculated = this.inputNumbers.reduce((acc, number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index > 0) return;

      const operator = this.operators[index];

      return this.operatings[operator](acc, number);
    }, 0);

    this.inputNumbers = [calculated];
  }

  /** inputNumbers를 비우는 메소드 */
  clearInputNumbers() {
    this.inputNumbers = [0];
  }
}
