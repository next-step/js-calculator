import { KEY_TYPE, MODIFIER, OPERATION, VALIDATION } from './constants/calculator.js';
import { CALCULATOR_ERROR } from './constants/errorMessage.js';
import { $ } from './utils/querySelector.js';

const operationMap = {
  [OPERATION.ADD]: (a, b) => a + b,
  [OPERATION.SUBTRACT]: (a, b) => a - b,
  [OPERATION.MULTIPLY]: (a, b) => a * b,
  [OPERATION.DIVIDE]: (a, b) => Math.floor(a / b),
};

const digits = [...Array(10).keys()].reverse();
const operations = Object.values(OPERATION);

const digitButtons = digits.reduce(
  (prev, cur) => prev + `<button class="digit" data-digit="${cur}">${cur}</button>`,
  ''
);
const operationButtons = operations.reduce(
  (prev, cur) => prev + `<button class="operation" data-operation="${cur}">${cur}</button>`,
  ''
);

const initialState = { numbers: [0], operations: [], currentKeyType: KEY_TYPE.DIGIT };

class Calculator extends HTMLElement {
  state;

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.setState(initialState);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  render() {
    this.id = 'app';
    this.insertAdjacentHTML(
      'beforeend',
      `
      <div class="calculator">
        <h1 id="total"></h1>
        <div id="digits" class="digits flex">
          ${digitButtons}
        </div>
        <div class="modifiers subgrid">
          <button id="modifiers" class="modifier" data-modifier="${MODIFIER.AC}">${MODIFIER.AC}</button>
        </div>
        <div id="operations" class="operations subgrid">
          ${operationButtons}
        </div>
      </div>`
    );
  }

  update() {
    $('#total').textContent = this.getTotal();
  }

  getTotal() {
    const { numbers, operations } = this.state;

    return numbers.reduce(
      (prev, number, idx) => (operations[idx] ? prev + number + operations[idx] : prev + number),
      ''
    );
  }

  bindEvents() {
    $('#digits').addEventListener('click', this.onClickDigit.bind(this));
    $('#operations').addEventListener('click', this.onClickOperation.bind(this));
    $('#modifiers').addEventListener('click', this.onClickModifier.bind(this));
  }

  onClickDigit({ target }) {
    const { numbers, currentKeyType } = this.state;
    const digit = Number(target.dataset.digit);

    if (isNaN(digit)) return;

    if (currentKeyType === KEY_TYPE.DIGIT) {
      const lastNumberLength = numbers[numbers.length - 1].toString().length;

      if (lastNumberLength >= VALIDATION.MAX_NUMBER_LENGTH) {
        alert(CALCULATOR_ERROR.EXCEED_MAX_NUMBER_LENGTH);
        return;
      }

      this.appendDigit(digit);
    }

    if (currentKeyType === KEY_TYPE.OPERATION) {
      this.pushNewDigit(digit);
    }
  }

  appendDigit(digit) {
    const newNumbers = [...this.state.numbers];
    const lastNumber = newNumbers.pop();

    newNumbers.push(lastNumber * 10 + digit);

    this.setState({ numbers: newNumbers, currentKeyType: KEY_TYPE.DIGIT });
  }

  pushNewDigit(digit) {
    this.setState({ numbers: [...this.state.numbers, digit], currentKeyType: KEY_TYPE.DIGIT });
  }

  onClickOperation({ target }) {
    const { operation } = target.dataset;

    if (!operation) return;

    if (operation === OPERATION.EQUAL) {
      this.calculate();
    } else {
      this.setOperation(operation);
    }
  }

  calculate() {
    const [number1, number2] = this.state.numbers;
    const [operation] = this.state.operations;

    if (number1 === undefined || number2 === undefined || operation === undefined) return;

    const operate = operationMap[operation];
    const result = operate(number1, number2);

    this.setState({ ...initialState, numbers: [result] });
  }

  setOperation(operation) {
    const { operations, numbers, currentKeyType } = this.state;
    const isNumbersEmpty = numbers[0] === 0;

    if (isNumbersEmpty) {
      alert(CALCULATOR_ERROR.OPERATION_WITH_NO_NUMBER);
      return;
    }

    const newOperations = [...operations];

    if (currentKeyType === KEY_TYPE.OPERATION) {
      newOperations.pop();
    }

    newOperations.push(operation);

    this.setState({ operations: newOperations, currentKeyType: KEY_TYPE.OPERATION });
  }

  onClickModifier({ target }) {
    const { modifier } = target.dataset;

    if (!modifier) return;

    if (modifier === MODIFIER.AC) this.reset();
  }

  reset() {
    this.setState({ ...initialState });
  }
}

customElements.define('my-calculator', Calculator);
