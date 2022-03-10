export default class Calculator {
  constructor() {
    this.value = 0;
    this.inputNumbers = [];
    this.operators = [];
    this.operatings = {
      '+': (numberA, numberB) => numberA + numberB,
      '-': (numberA, numberB) => numberA - numberB,
      '/': (numberA, numberB) => Math.floor(numberA / numberB),
      '*': (numberA, numberB) => Math.floor(numberA * numberB),
    };
  }

  /** 연산의 대상이 되는 numberText를 number로 바꿔 inputNumbers 배열에 넣는 메소드 */
  inputNumber(numberText) {
    if (numberText.length > 3) {
      return alert('숫자는 세 자리까지만 입력 가능합니다!');
    }

    if (!isNaN(Number(numberText))) {
      this.inputNumbers = this.inputNumbers.concat(Number(numberText));
    }
  }

  /** number들을 연산하는 메소드 */
  operateNumbers() {
    // 2개 숫자 이상의 긴 연산에 대비한 반복문 로직

    this.inputNumbers.forEach((number, index) => {
      // 3개 이상의 숫자는 연산하지 않는다.
      if (index > 0) return;

      const operator = this.operators[index];
      this.value = this.operatings[operator](this.value, number);
    });
  }

  /** inputNumbers를 비우는 메소드 */
  clearInputNumbers() {
    this.inputNumbers = [];
  }
}
