import { $ } from "./utils.js";
import { calculator } from "./calculator.js";

class App {
  total = $("#total");

  init() {
    this.setEventListener();
  }

  setEventListener() {
    const calculatorArea = $(".calculator");

    calculatorArea.addEventListener("click", (e) => {
      if (e.target.className === "digit") {
        const digit = e.target.innerText;
        calculator.pressDigit(digit);
        this.showNumber(calculator.current);
        return;
      }

      if (e.target.className === "operation") {
        const currentOperator = e.target.innerText;
        calculator.pressOperator(currentOperator);
        this.showNumber(calculator.result);

        return;
      }

      if (e.target.className === "modifier") {
        calculator.allClear();
        this.showNumber(calculator.result);
      }
    });
  }

  showNumber(number) {
    total.innerText = number;
  }
}

export default App;
