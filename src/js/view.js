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
      .addEventListener('click', this.handleNumberButtonClick.bind(this));
  }

  /** 입력된 숫자들과 연산자들을 렌더링하는 메소드 */
  renderNumbers() {
    this.rootElement.querySelector('#total').innerText =
      this.calculator.getNumberAndOperators();
  }

  handleNumberButtonClick(event) {
    const numberText = event.target.innerText;

    this.calculator.inputNumber(numberText);
    this.renderNumbers();
  }

  handleOperationButtonClick() {}

  handleClearButtonClick() {}
}
