class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.operatorCheck = true;
    this.modifierCheck = false;
    this.displayTmpValue = "";
  }
  appendNumber(number) {
    if (this.modifierCheck) {
      this.modifierCheck = false;
      this.displayElement.innerText = 0;
      this.displayTmpValue = " ";
      this.displayTmpValue += number;
    } else {
      this.operatorCheck = false;
      this.displayTmpValue += number;
    }
  }

  appendOperator(operator) {
    if (this.operatorCheck) {
      return;
    } else {
      if (operator === "=") {
        this.compute();
      } else {
        this.displayTmpValue += operator;
        this.operatorCheck = true;
      }
    }
  }

  clear() {
    this.displayTmpValue = " ";
    this.displayElement.innerText = 0;
  }

  compute() {
    this.modifierCheck = true;
    this.displayTmpValue = eval(
      this.displayTmpValue.replace("\u00D7", "*").replace("\u00F7", "/")
    );
  }
  updateDisplay() {
    this.displayElement.innerText = this.displayTmpValue;
  }
}

const buttons = document.querySelectorAll("button");
const displayElement = document.querySelector("#total");
const calculator = new Calculator(displayElement);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.className) {
      case "digit":
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        break;
      case "operation":
        calculator.appendOperator(button.innerText);
        calculator.updateDisplay();
        break;
      case "modifier":
        calculator.clear();
        break;
      default:
        console.log("default");
        break;
    }
  });
});
