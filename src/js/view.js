export default class View {
  constructor(rootElement, calculator) {
    this.rootElement = rootElement;
    this.calculator = calculator;
    this.addEventListeners();
    this.renderNumbers();
  }

  addEventListeners() {
    this.rootElement
      .querySelector('.digits')
      .addEventListener('click', this.handleNumberButtonClick);
  }

  /** 입력된 숫자들과 연산자들을 렌더링하는 메소드 */
  renderNumbers() {
    this.rootElement.querySelector('#total').innerText = 'test';
  }

  handleNumberButtonClick(event) {
    const numberText = event.target.innerText;

    this.calculator.inputNumber(numberText);
  }

  handleClearButtonClick() {}

  handleOperationButtonClick() {}
}
