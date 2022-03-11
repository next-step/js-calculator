import { OPERATION, EMPTY_STRING } from './constants.js';

export default class Calculator {
  #firstNumberAsString;
  #secondNumberAsString;
  #operation;
  #total;
  #isDone;

  constructor() {
    this.#init();
    this.#bindEvents();
  }

  #init() {
    this.#firstNumberAsString = EMPTY_STRING;
    this.#secondNumberAsString = EMPTY_STRING;
    this.#operation = undefined;
    this.#total = 0;
    this.#isDone = false;

    this.#renderScreen(this.#total);
  }

  #bindEvents() {
    document.querySelector('.calculator').addEventListener('click', event => {
      const { target } = event;

      if (!target.matches('.digit, .modifier, .operation')) {
        return;
      }

      if (target.matches('.modifier')) {
        this.#init();

        return;
      }

      if (target.matches('.operation')) {
        this.#handleOperation(target.dataset.operation);

        return;
      }

      this.#handleDigit(target.dataset.value);
    });
  }

  #handleOperation(operation) {
    if (this.#isDone) {
      return;
    }

    if (operation === OPERATION.EQUALS) {
      this.#handleEquals();

      return;
    }

    this.#operation = operation;
  }

  #handleEquals() {
    if (this.#isDone) {
      return;
    }

    if (
      this.#firstNumberAsString === EMPTY_STRING ||
      this.#secondNumberAsString === EMPTY_STRING ||
      this.#operation === undefined
    ) {
      return;
    }

    const firstNumber = parseInt(this.#firstNumberAsString);
    const secondNumber = parseInt(this.#secondNumberAsString);

    switch (this.#operation) {
      case OPERATION.DIVIDE:
        this.#total = Math.floor(firstNumber / secondNumber);
        break;
      case OPERATION.MULTIPLY:
        this.#total = firstNumber * secondNumber;
        break;
      case OPERATION.MINUS:
        this.#total = firstNumber - secondNumber;
        break;
      case OPERATION.PLUS:
        this.#total = firstNumber + secondNumber;
        break;
      default:
        throw new Error(`Unknown operation: ${this.#operation}`);
    }

    this.#renderScreen(this.#total);
    this.#isDone = true;
  }

  #handleDigit(input) {
    if (this.#isDone) {
      this.#init();
    }

    const isFirstNumber = this.#operation === undefined;
    const prev = isFirstNumber
      ? this.#firstNumberAsString
      : this.#secondNumberAsString;

    if (prev.length >= 3) {
      return;
    }

    const newNumberAsString = `${prev}${input}`;

    isFirstNumber
      ? (this.#firstNumberAsString = newNumberAsString)
      : (this.#secondNumberAsString = newNumberAsString);

    this.#renderScreen(newNumberAsString);
  }

  #renderScreen(value) {
    document.querySelector('#screen').textContent = value;
  }
}
