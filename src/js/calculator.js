import { OPERATION, EMPTY_STRING } from './constants.js';
import {
  mathOperations,
  validateInputs,
  validateInputLength,
} from './utils.js';

const defaultState = {
  firstNumberAsString: EMPTY_STRING,
  secondNumberAsString: EMPTY_STRING,
  operation: undefined,
  total: 0,
  isDone: false,
};

export default class Calculator {
  #firstNumberAsString = defaultState.firstNumberAsString;
  #secondNumberAsString = defaultState.secondNumberAsString;
  #operation = defaultState.operation;
  #total = defaultState.total;
  #isDone = defaultState.isDone;

  constructor() {
    bindEvents.call(this);

    function bindEvents() {
      document.querySelector('.calculator').addEventListener('click', event => {
        const { target } = event;

        if (!target.matches('.digit, .modifier, .operation')) {
          return;
        }

        if (target.matches('.modifier')) {
          this.#reset();

          return;
        }

        if (target.matches('.operation')) {
          this.#handleOperationClick(target.dataset.operation);

          return;
        }

        this.#handleDigitClick(target.dataset.value);
      });
    }
  }

  #reset() {
    this.#firstNumberAsString = defaultState.firstNumberAsString;
    this.#secondNumberAsString = defaultState.secondNumberAsString;
    this.#operation = defaultState.operation;
    this.#total = defaultState.total;
    this.#isDone = defaultState.isDone;
    this.#renderScreen(this.#total);
  }

  #handleOperationClick(operation) {
    const isOperationConfirmed =
      operation !== OPERATION.EQUALS &&
      this.#operation &&
      this.#secondNumberAsString !== EMPTY_STRING;

    if (this.#isDone || isOperationConfirmed) {
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
      this.#secondNumberAsString
    );

    if (!inputsValidation.result) {
      alert(inputsValidation.message);

      return;
    }

    const firstNumber = Number(this.#firstNumberAsString);
    const secondNumber = Number(this.#secondNumberAsString);

    this.#total = mathOperations[this.#operation](firstNumber, secondNumber);
    this.#renderScreen(this.#total);
    this.#isDone = true;
  }

  #handleDigitClick(input) {
    if (this.#isDone) {
      this.#reset();
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
