import { operatorsIcons } from "./constant.js";

export class Model {
  #num1 = 0;
  #num2 = 0;
  #operation;

  #operators = {
    add: (num1, num2) => num1 + num2,
    minus: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => Math.floor(num1 / num2),
  };

  #onOverInputNumber;
  #maxLengthOfInputNumber;
  #onStepChanged;

  constructor({ maxLengthOfInputNumber, onOverInputNumber, onStepChanged }) {
    this.#onOverInputNumber = onOverInputNumber;
    this.#maxLengthOfInputNumber = maxLengthOfInputNumber;
    this.#onStepChanged = onStepChanged;
  }

  calculate() {
    const calculatedValue = this.#operation
      ? this.#operators[this.#operation](this.#num1, this.#num2)
      : this.#num1;

    this.reset();
    this.#num1 = calculatedValue;
  }

  reset() {
    this.#num1 = 0;
    this.#num2 = 0;
    this.#operation = undefined;
  }

  inputNum(value) {
    if (this.isOverInputNumber()) {
      this.#onOverInputNumber();
      return;
    }

    if (this.#operation) {
      this.#num2 *= 10;
      this.#num2 += value;
    } else {
      this.#num1 *= 10;
      this.#num1 += value;
    }
  }

  getDisplay() {
    const numLabel1 = this.#num1 || "";
    const numLabel2 = this.#num2 || "";

    const operationLabel =
      this.#operation === undefined ? "" : operatorsIcons[this.#operation];

    return `${numLabel1}${operationLabel}${numLabel2}`;
  }

  isOverInputNumber() {
    const pivotValue = Math.pow(10, this.#maxLengthOfInputNumber - 1);
    const targetValue = this.#operation ? this.#num2 : this.#num1;
    return pivotValue <= targetValue;
  }

  isInitial() {
    return this.#num1 === 0;
  }

  isStepChanged() {
    return this.#operation || this.#num1 === 0;
  }

  set operation(operation) {
    if (this.isStepChanged()) {
      this.#onStepChanged();
      return;
    }
    this.#operation = operation;
  }
}
