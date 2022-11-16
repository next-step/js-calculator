import {
  ALERT_MESSAGE,
  ALLOWED_MAX_NUMBER,
  ALLOWED_MAX_OPERATOR_COUNT,
} from "./constants.js";
import Calculator from "./calculator.js";
import { isEmpty, isEqual, isGreaterThan, isSame } from "./utils.js";

class Ui {
  #current;
  #total;
  #calculator;
  #numbers;
  #operators;

  constructor($total) {
    this.#current = "";
    this.#total = $total;
    this.#calculator = new Calculator();

    this.#numbers = [];
    this.#operators = [];
    this.haveBeenGetResult = false;
  }

  onSaveEnteredValue({ current, operator }) {
    this.#numbers.push(Number(current));
    this.#operators.push(operator);
  }

  onClickDigit(digit) {
    if (isGreaterThan(Number(this.#current + digit), ALLOWED_MAX_NUMBER)) {
      alert(ALERT_MESSAGE.EXCEEDED_ALLOW_NUMBER);
      return;
    }

    this.#current += digit;
    this.#addToTotalText(digit);
  }

  onClickOperator(operator) {
    const current = this.#current;

    if (isEmpty(current)) {
      alert(ALERT_MESSAGE.HAVE_NO_CALCULATION_NUMBER);
      return;
    }

    if (isEqual(operator, "=")) {
      const result = this.#calculator.calculate({
        current: this.#current,
        numbers: this.#numbers,
        operators: this.#operators,
        initialize: () => this.initialize(),
      });

      this.#total.innerText = result;
      this.haveBeenGetResult = true;

      return;
    }

    if (isSame(this.#operators.length + 1, ALLOWED_MAX_OPERATOR_COUNT)) {
      alert(ALERT_MESSAGE.EXCEEDED_NUMBER_OF_ALLOWED_OPERATOR);
      return;
    }

    this.onSaveEnteredValue({ current, operator });
    this.#current = "";
    this.#addToTotalText(operator);
  }

  #addToTotalText(input) {
    const isNewNumber = this.haveBeenGetResult || this.#total.innerText === "0";

    this.#total.innerText = isNewNumber
      ? input
      : (this.#total.innerText += input);

    this.haveBeenGetResult = false;
  }

  initialize() {
    this.#numbers = [];
    this.#operators = [];
    this.#current = "";
    this.#calculator.clear();
    this.#total.innerText = this.#calculator.value;
  }
}

export default Ui;
