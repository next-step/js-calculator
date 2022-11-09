import { $ } from "./utils.js";
import { calculator } from "./calculator.js";

class App {
  total = $("#total");

  init() {
    this.setEventListener();
  }

  setEventListener() {
    const digits = $(".digits");
    const operators = $(".operations");
    const allClearButton = $(".modifiers");

    digits.addEventListener("click", (e) => {
      const digit = e.target.closest(".digit").innerText;
      calculator.pressDigit(digit);
      this.showNumber(calculator.current);
    });

    operators.addEventListener("click", (e) => {
      const currentOperator = e.target.closest(".operation").innerText;
      calculator.pressOperator(currentOperator);
      this.showNumber(calculator.result);
    });

    allClearButton.addEventListener("click", () => {
      calculator.allClear();
      this.showNumber(calculator.result);
    });
  }

  showNumber(displayNumber) {
    total.innerText = displayNumber;
  }
}

export default App;
