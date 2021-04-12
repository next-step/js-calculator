class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.tmpValue = "";
    this.defaultState();
  }
  appendNumber(number) {
    if (this.modifierCheck) {
      this.modifierCheck = false;
      this.clear();
    }
    this.operatorCheck = false;
    this.tmpValue += number;
    console.log(this.tmpValue);
  }

  appendOperator(operator) {
    if (this.operatorCheck) {
      return;
    } else {
      if (operator === "=") {
        this.compute();
      } else {
        this.tmpValue += operator;
        this.defaultState();
      }
    }
  }

  clear() {
    this.tmpValue = " ";
    this.displayElement.innerText = 0;
  }

  compute() {
    this.modifierCheck = true;
    this.tmpValue = eval(this.tmpValue.replace("X", "*"));
    this.tmpValue = parseInt(this.tmpValue);
  }

  defaultState() {
    this.operatorCheck = true;
    this.modifierCheck = false;
  }

  updateDisplay() {
    this.displayElement.innerText = this.tmpValue;
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
