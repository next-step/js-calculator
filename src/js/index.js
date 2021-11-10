import { MODIFIER, OPERATION } from './constants/calculator.js';

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

class Calculator extends HTMLElement {
  connectedCallback() {
    this.render();
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
}

customElements.define('my-calculator', Calculator);
