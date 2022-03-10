export default class View {
  constructor(rootElement, calculator) {
    this.rootElement = rootElement;
    this.calculator = calculator;
    this.addEventListeners();
    this.renderNumberAndOperators();
  }

  /** 필요한 이벤트 리스너들을 등록하는 메소드 */
  addEventListeners() {
    this.rootElement
      .querySelector('.digits')
      .addEventListener('click', this.handleNumberButtonClick.bind(this));

    this.rootElement
      .querySelector('.operations')
      .addEventListener('click', this.handleOperationButtonClick.bind(this));

    this.rootElement
      .querySelector('.modifiers')
      .addEventListener('click', this.handleClearButtonClick.bind(this));
  }

  /** 입력된 숫자들과 연산자들을 렌더링하는 메소드 */
  renderNumberAndOperators() {
    this.rootElement.querySelector('#total').innerText = this.calculator
      .getNumberAndOperators()
      .join('');
  }

  /** 숫자 버튼 클릭 이벤트 리스너 */
  handleNumberButtonClick(event) {
    const { digit } = event.target.dataset;

    this.calculator.inputNumber(digit);
    this.renderNumberAndOperators();
  }

  /** 연산자 버튼 클릭 이벤트 리스너 */
  handleOperationButtonClick(event) {
    const { operator } = event.target.dataset;

    this.calculator.inputOperator(operator);
    this.renderNumberAndOperators();
  }

  /** AC 버튼 클릭 이벤트 리스너 */
  handleClearButtonClick() {
    this.calculator.clearNumbersAndOperators();
    this.renderNumberAndOperators();
  }
}
