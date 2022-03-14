import { Calculator } from "./calculator.js";
export class CalculatorView {
  #calculatorService;
  #totalElement;

  constructor() {
    this.#calculatorService = new Calculator();
    this.#setEventListeners();
    this.#totalElement = document.querySelector("#total");
  }

  #setEventListeners() {
    const digits = document.getElementsByClassName("digit");
    for (const digit of digits) {
      digit.addEventListener("click", () => {
        this.#calculatorService.onClickDigits(digit);
        this.#updateDisplayText();
      });
    }

    const operations = document.getElementsByClassName("operation");
    for (const operation of operations) {
      operation.addEventListener("click", () => {
        this.#calculatorService.onClickOperator(operation);
        this.#updateDisplayText();
      });
    }

    const equal = document.getElementById("equal");
    equal.addEventListener("click", () => {
      this.#calculatorService.onClickEqual();
      this.#updateDisplayText();
    });

    const modifier = document.getElementsByClassName("modifier")[0];
    modifier.addEventListener("click", () => {
      this.#calculatorService.onClickModifier();
      this.#updateDisplayText();
    });
  }

  #updateDisplayText = () => {
    const text = this.#calculatorService.getDisplayText();
    this.#totalElement.innerText = text;
  };
}
