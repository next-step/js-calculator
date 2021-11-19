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

const initialState = { numbers: [0], operation: '', currentKeyType: KEY_TYPE.DIGIT };

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
    const {
      numbers: [number1 = '', number2 = ''],
      operation = '',
    } = this.state;

    return `${number1}${operation}${number2}`;
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

    try {
      if (currentKeyType === KEY_TYPE.DIGIT) {
        const lastNumberLength = numbers[numbers.length - 1].toString().length;

        if (lastNumberLength >= VALIDATION.MAX_NUMBER_LENGTH) {
          throw Error(CALCULATOR_ERROR.EXCEED_MAX_NUMBER_LENGTH);
        }

        this.appendDigit(digit);
      }

      if (currentKeyType === KEY_TYPE.OPERATION) {
        this.pushNewDigit(digit);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
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

    try {
      if (operation === OPERATION.EQUAL) {
        this.calculate();
        return;
      }

      if (this.state.numbers.length === 2) {
        this.calculate();
      }

      this.setOperation(operation);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  calculate() {
    const {
      numbers: [number1, number2],
      operation,
    } = this.state;

    if (number1 === undefined || number2 === undefined || operation === undefined) return;

    const operate = operationMap[operation];
    const result = operate(number1, number2);

    this.setState({ ...initialState, numbers: [result] });
  }

  setOperation(operation) {
    const {
      numbers: [number1],
      currentKeyType,
    } = this.state;
    const isNumbersEmpty = number1 === 0;

    if (isNumbersEmpty && currentKeyType !== KEY_TYPE.OPERATION) {
      throw Error(CALCULATOR_ERROR.OPERATION_WITH_NO_NUMBER);
    }

    this.setState({ operation, currentKeyType: KEY_TYPE.OPERATION });
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
