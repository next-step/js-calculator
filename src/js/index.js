import { KEY_TYPE, MODIFIER, OPERATION } from './constants/calculator.js';
import { $ } from './utils/querySelector.js';

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
  }

  onClickDigit({ target }) {
    const { numbers, currentKeyType } = this.state;
    const digit = Number(target.dataset.digit);

    if (!digit) return;

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
}

customElements.define('my-calculator', Calculator);
