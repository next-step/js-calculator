import { MAX_LENGTH_ALERT_STRING, OPERATOR_TYPE } from "./constants.js";
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

  #updateDisplayText = (text) => {
    const total = document.querySelector("#total");
    total.innerText = text;
  };

  #initializeInputData = () => {
    this.#firstNumberString = "";
    this.#secondNumberString = "";
    this.#operator = "";
    this.#hasClickedOperator = false;
  };

  #isLessThanThreeDigits = (numberString) => {
    if (numberString.length < 3) {
      return true;
    }
    return false;
  };

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
        return 0;
    }
  };

  #onClickDigits = (digit) => {
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
    this.#updateDisplayText(this.#displayText);
  };

  #onClickOperator = (operation) => {
    this.#hasClickedOperator = true;
    this.#operator = operation.textContent;
    this.#displayText += operation.textContent;
    this.#updateDisplayText(this.#displayText);
  };

  #onClickEqual = () => {
    // calculate here
    const firstNumber = Number(this.#firstNumberString);
    const secondNumber = Number(this.#secondNumberString);
    this.#displayText = this.#calculate(
      firstNumber,
      secondNumber,
      this.#operator
    );
    this.#updateDisplayText(this.#displayText);
    this.#initializeInputData();
  };

  #onClickModifier = () => {
    this.#displayText = "0";
    this.#initializeInputData();
    this.#updateDisplayText(this.#displayText);
  };

  setEventListeners() {
    const digits = document.getElementsByClassName("digit");
    for (const digit of digits) {
      digit.addEventListener("click", () => {
        this.#onClickDigits(digit);
      });
    }

    const operations = document.getElementsByClassName("operation");
    for (const operation of operations) {
      operation.addEventListener("click", () => {
        this.#onClickOperator(operation);
      });
    }

    const equal = document.getElementById("equal");
    equal.addEventListener("click", () => {
      this.#onClickEqual();
    });

    const modifier = document.getElementsByClassName("modifier")[0];
    modifier.addEventListener("click", () => {
      this.#onClickModifier();
    });
  }
}
