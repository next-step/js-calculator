import {
  ALERT_MESSAGE,
  ALLOWED_MAX_NUMBER,
  ALLOWED_MAX_OPERATOR_COUNT,
} from "./constants.js";
import Calculator from "./calculator.js";

class Ui {
  #numbers;
  #operators;
  #current;
  #total;
  #calculator;
  #haveBeenGetResult;

  constructor($total) {
    this.#current = "";
    this.#numbers = [];
    this.#operators = [];
    this.#total = $total;
    this.#haveBeenGetResult = false;
    this.#calculator = new Calculator();
  }

  set haveBeenGetResult(state) {
    this.#haveBeenGetResult = state;
  }

  #calculate() {
    if (this.#numbers.length < 1 || this.#operators.length === 0) {
      alert(ALERT_MESSAGE.CANT_NOT_CALCULATION);
      this.initialize();
      return;
    }

    this.#operators.forEach((operator, idx) => {
      const totalNumbers = [...this.#numbers, Number(this.#current)];
      const prev = idx === 0 ? totalNumbers[idx] : this.#calculator.value;

      if (operator === "+") this.#calculator.sum(prev, totalNumbers[idx + 1]);
      if (operator === "-")
        this.#calculator.subtract(prev, totalNumbers[idx + 1]);
      if (operator === "X")
        this.#calculator.multiple(prev, totalNumbers[idx + 1]);
      if (operator === "/")
        this.#calculator.divide(prev, totalNumbers[idx + 1]);
    });

    this.cleanUp();
    this.#syncCalculator();
  }

  onClickDigit(input) {
    if (this.#current + input > ALLOWED_MAX_NUMBER) {
      alert(ALERT_MESSAGE.EXCEEDED_ALLOW_NUMBER);
      return;
    }

    this.#current += input;

    this.#render(input);
  }

  onClickOperator(input) {
    if (this.#current === "") {
      alert(ALERT_MESSAGE.HAVE_NO_CALCULATION_NUMBER);
      return;
    }

    if (input === "=") {
      this.haveBeenGetResult = true;
      this.#calculate();
      return;
    }

    if (this.#operators.length + 1 === ALLOWED_MAX_OPERATOR_COUNT) {
      alert(ALERT_MESSAGE.EXCEEDED_NUMBER_OF_ALLOWED_OPERATOR);
      return;
    }

    this.#numbers = [...this.#numbers, Number(this.#current)];
    this.#operators = [...this.#operators, input];
    this.#current = "";
    this.#render(input);
  }

  #syncCalculator() {
    this.#total.innerText = this.#calculator.value;
  }

  #render(input) {
    const isNewNumber =
      this.#haveBeenGetResult || this.#total.innerText === "0";

    this.#total.innerText = isNewNumber
      ? input
      : (this.#total.innerText += input);

    this.haveBeenGetResult = false;
  }

  cleanUp() {
    this.#numbers = [];
    this.#operators = [];
    this.#current = "";
  }

  initialize() {
    this.cleanUp();
    this.#calculator.clear();
    this.#total.innerText = 0;
  }
}

export default Ui;
