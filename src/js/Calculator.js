import { OPERATORS, MAXIMUM_DIGITS_LENGTH } from "./utils/constants.js";

export default class Calculator {
  constructor(displayElement) {
    this.operator = "";
    this.tmpValue = "";
    this.displayElement = displayElement;
    this.defaultState();
  }

  putNumber(number) {
    if (!this.isValidLength()) {
      return alert("숫자는 세 자리까지만 입력 가능합니다!");
    }

    if (this.modifierCheck) {
      this.modifierCheck = false;
      this.clear();
    }
    if (this.displayElement.innerText === "0") {
      if (number === "0") {
        return;
      }
    }
    this.operatorCheck = false;
    this.tmpValue += number;
    this.updateDisplay();
  }

  putOperator(operator) {
    if (this.operatorCheck) {
      return;
    } else {
      if (operator === "=") {
        this.compute();
      } else {
        this.tmpValue += operator;
        this.defaultState();
      }
      this.updateDisplay();
    }
  }

  clearDisplay() {
    this.tmpValue = " ";
    this.displayElement.innerText = 0;
    this.defaultState();
  }

  compute() {
    this.modifierCheck = true;
    this.tmpValue = eval(this.tmpValue.replace("X", "*"));
    this.tmpValue = parseInt(this.tmpValue);
  }

  isValidLength() {
    this.operator = this.displayElement.innerText
      .split("")
      .find((v) => OPERATORS.includes(v));
    if (!this.operator) {
      return this.displayElement.innerText.length < MAXIMUM_DIGITS_LENGTH;
    }
    return (
      this.displayElement.innerText.split(this.operator)[1].length <
      MAXIMUM_DIGITS_LENGTH
    );
  }

  defaultState() {
    this.operatorCheck = true;
    this.modifierCheck = false;
  }

  updateDisplay() {
    this.displayElement.innerText = this.tmpValue;
  }
}
