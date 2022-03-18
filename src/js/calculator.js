import {
  MAX_LENGTH_ALERT_STRING,
  INPUT_ERROR_MESSAGE,
  OPERATOR_TYPE,
} from "./constants.js";
export class Calculator {
  #firstNumberString;
  #secondNumberString;
  #operator;
  #displayText;
  #hasClickedOperator;

  constructor() {
    this.#firstNumberString = "";
    this.#secondNumberString = "";
    this.#operator = "";
    this.#displayText = "";
    this.#hasClickedOperator = false;
  }

  #initializeInputData = () => {
    this.#firstNumberString = "";
    this.#secondNumberString = "";
    this.#operator = "";
    this.#hasClickedOperator = false;
  };

  #isLessThanThreeDigits = (numberString) => numberString.length < 3;

  #calculate = (num1, num2, operator) => {
    switch (operator) {
      case OPERATOR_TYPE.DIVIDE:
        return Math.floor(num1 / num2);
      case OPERATOR_TYPE.MULTIPLY:
        return num1 * num2;
      case OPERATOR_TYPE.DECREASE:
        return num1 - num2;
      case OPERATOR_TYPE.INCREASE:
        return num1 + num2;
      default:
        throw "Invalid operator.";
    }
  };

  getDisplayText = () => {
    return this.#displayText;
  };

  onClickDigits = (digit) => {
    if (this.#hasClickedOperator) {
      if (!this.#isLessThanThreeDigits(this.#secondNumberString)) {
        window.alert(MAX_LENGTH_ALERT_STRING);
        return;
      }
      this.#secondNumberString += digit.textContent;
      this.#displayText =
        this.#firstNumberString + this.#operator + this.#secondNumberString;
    } else {
      if (!this.#isLessThanThreeDigits(this.#firstNumberString)) {
        window.alert(MAX_LENGTH_ALERT_STRING);
        return;
      }
      this.#firstNumberString += digit.textContent;
      this.#displayText = this.#firstNumberString;
    }
  };

  onClickOperator = (operation) => {
    this.#hasClickedOperator = true;
    this.#operator = operation.textContent;
    this.#displayText += operation.textContent;
  };

  onClickEqual = () => {
    // calculate here
    try {
      const firstNumber = Number(this.#firstNumberString);
      const secondNumber = Number(this.#secondNumberString);
      this.#displayText = this.#calculate(
        firstNumber,
        secondNumber,
        this.#operator
      );
    } catch (err) {
      window.alert(INPUT_ERROR_MESSAGE);
      console.error(err);
    }
    this.#initializeInputData();
  };

  onClickModifier = () => {
    this.#displayText = "0";
    this.#initializeInputData();
  };
}
