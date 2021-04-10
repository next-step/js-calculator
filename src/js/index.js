class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.operatorCheck = true;
    this.clear();
  }
  appendNumber(number) {
    this.displayContent += number;
    this.operatorCheck = false;
  }

  appendOperator(operator) {
    if (this.operatorCheck) {
      return;
    } else {
      if (operator === "=") {
        this.compute();
      } else {
        this.displayContent += operator;
        this.operatorCheck = true;
      }
    }
  }

  clear() {
    this.displayContent = "";
    this.displayElement.innerText = 0;
  }
  compute() {
    this.displayContent = eval(
      this.displayContent.replace("\u00D7", "*").replace("\u00F7", "/")
    );
  }
  updateDisplay() {
    this.displayElement.innerText = this.displayContent;
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
        if (calculator.displayElement.innerText) {
          calculator.appendOperator(button.innerText);
          calculator.updateDisplay();
        }
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
