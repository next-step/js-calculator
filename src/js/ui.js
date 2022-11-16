import {
  ALERT_MESSAGE,
  ALLOWED_MAX_NUMBER,
  ALLOWED_MAX_OPERATOR_COUNT,
} from "./constants.js";
import Calculator from "./calculator.js";
import {
  isEmpty,
  isEqual,
  isGreaterThan,
  isSame,
  isSmallerThan,
} from "./utils.js";

class Ui {
  #numbers;
  #operators;
  #current;
  #total;
  #calculator;

  constructor($total) {
    this.#current = "";
    this.#numbers = [];
    this.#operators = [];
    this.#total = $total;
    this.#calculator = new Calculator();
    this.haveBeenGetResult = false;
  }

  #calculate() {
    if (
      isSmallerThan(this.#numbers.length, 1) ||
      isSame(this.#operators.length, 0)
    ) {
      alert(ALERT_MESSAGE.CANT_NOT_CALCULATION);
      this.initialize();
      return;
    }

    this.#operators.forEach((operator, idx) => {
      const totalNumbers = [...this.#numbers, Number(this.#current)];
      const prev = idx === 0 ? totalNumbers[idx] : this.#calculator.value;
      const cur = totalNumbers[idx + 1];

      this.#calculator.calculate({ prev, cur, operator });
    });

    this.cleanUp();
    this.#total.innerText = this.#calculator.value;
  }

  onSaveEnteredValue({ cur, operator }) {
    this.#numbers.push(Number(cur));
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
    const cur = this.#current;

    if (isEmpty(cur)) {
      alert(ALERT_MESSAGE.HAVE_NO_CALCULATION_NUMBER);
      return;
    }

    if (isEqual(operator, "=")) {
      this.haveBeenGetResult = true;
      this.#calculate();
      return;
    }

    if (isSame(this.#operators.length + 1, ALLOWED_MAX_OPERATOR_COUNT)) {
      alert(ALERT_MESSAGE.EXCEEDED_NUMBER_OF_ALLOWED_OPERATOR);
      return;
    }

    this.onSaveEnteredValue({ cur, operator });
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

  cleanUp() {
    this.#numbers = [];
    this.#operators = [];
    this.#current = "";
  }

  initialize() {
    this.cleanUp();
    this.#calculator.clear();
    this.#total.innerText = "0";
  }
}

export default Ui;
