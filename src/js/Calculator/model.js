class Calculator {
  #leftValue;

  #rightValue;

  constructor(total) {
    this.total = total;
  }

  get leftValue() {
    return this.#leftValue;
  }

  set leftValue(value) {
    if (Number.isNaN(value)) document.alert('Not a number 😤');

    this.#leftValue = value;
  }

  get rightValue() {
    return this.#rightValue;
  }

  set rightValue(value) {
    if (Number.isNaN(value)) document.alert('Not a number 😤');

    this.#leftValue = value;
  }

  clear() {
    this.total = 0;
  }

  add() {
    this.total = this.#leftValue + this.#rightValue;
  }

  substract() {
    this.total = this.#leftValue - this.#rightValue;
  }

  divide() {
    this.total = this.#leftValue / this.#rightValue;
  }

  multiply() {
    this.total = this.#leftValue * this.#rightValue;
  }
}

export default Calculator;
