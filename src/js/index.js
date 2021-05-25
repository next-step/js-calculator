import Calculator from "./Calculator.js";

const buttons = document.querySelectorAll("button");
const displayValue = document.querySelector("#total");
const calculator = new Calculator(displayValue);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.className) {
      case "digit":
        calculator.putNumber(button.innerText);
        break;
      case "operation":
        calculator.putOperator(button.innerText);
        break;
      case "modifier":
        calculator.clearDisplay();
        break;
      default:
        console.log("default");
        break;
    }
  });
});
