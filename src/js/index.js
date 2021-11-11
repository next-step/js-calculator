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
  state = { ...initialState };

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.update();
  }

  render() {
    this.id = 'app';
    this.innerHTML = `
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
      </div>`;
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
  }

  onClickDigit({ target }) {
    const { numbers, currentKeyType } = this.state;
    const digit = Number(target.dataset.digit);
    const lastNumber = [...numbers].pop();

    if (!digit) return;

    if (lastNumber.toString().length >= VALIDATION.MAX_NUMBER_LENGTH) {
      alert(CALCULATOR_ERROR.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }

    let newNumbers;

    if (currentKeyType === KEY_TYPE.DIGIT) {
      const copiedNumbers = [...numbers];
      const lastNumber = copiedNumbers.pop();
      const appendedNumber = lastNumber * 10 + digit;

      newNumbers = [...copiedNumbers, appendedNumber];
    }

    if (currentKeyType === KEY_TYPE.OPERATION) {
      newNumbers = [...numbers, digit];
    }

    this.setState({ numbers: newNumbers, currentKeyType: KEY_TYPE.DIGIT });
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
    const operate = operationMap[operation];
    const result = operate(number1, number2);

    this.setState({ ...initialState, numbers: [result] });
  }

  setOperation(operation) {
    const { operations, currentKeyType } = this.state;

    const copiedOperations = [...operations];

    if (currentKeyType === KEY_TYPE.OPERATION) {
      copiedOperations.pop();
    }

    this.setState({
      operations: [...copiedOperations, operation],
      currentKeyType: KEY_TYPE.OPERATION,
    });
  }
}

customElements.define('my-calculator', Calculator);
