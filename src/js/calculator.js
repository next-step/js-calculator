import { OPERATION, EMPTY_STRING } from './constants.js';
import {
  mathOperations,
  validateInputs,
  validateInputLength,
} from './utils.js';

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
        this.#handleOperationClick(target.dataset.operation);

        return;
      }

      this.#handleDigitClick(target.dataset.value);
    });
  }

  #handleOperationClick(operation) {
    if (this.#isDone) {
      return;
    }

    if (operation === OPERATION.EQUALS) {
      this.#handleEqualsClick();

      return;
    }

    this.#operation = operation;
  }

  #handleEqualsClick() {
    if (this.#isDone) {
      return;
    }

    const inputsValidation = validateInputs(
      this.#firstNumberAsString,
      this.#secondNumberAsString,
      this.#operation
    );

    if (!inputsValidation.result) {
      alert(inputsValidation.message);

      return;
    }

    const firstNumber = parseInt(this.#firstNumberAsString);
    const secondNumber = parseInt(this.#secondNumberAsString);

    this.#total = mathOperations[this.#operation](firstNumber, secondNumber);
    this.#renderScreen(this.#total);
    this.#isDone = true;
  }

  #handleDigitClick(input) {
    if (this.#isDone) {
      this.#init();
    }

    const isFirstNumber = this.#operation === undefined;
    const prev = isFirstNumber
      ? this.#firstNumberAsString
      : this.#secondNumberAsString;

    if (!validateInputLength(prev)) {
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
