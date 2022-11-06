import Operation from "./Operation.js";
import operators from "../constants/operators.js";

class Operations {
  constructor({ $calculator, getTotalValue, setTotalValue }) {
    this.$calculator = $calculator;
    this.getTotalValue = getTotalValue;
    this.setTotalValue = setTotalValue;
    this.render();
  }

  render() {
    this.$calculator.insertAdjacentHTML(
      "beforeend",
      `<div class="operations subgrid"></div>`
    );

    const $operations = document.querySelector(".operations");

    operators.forEach((operator) => {
      new Operation({
        $operations,
        operator,
        getTotalValue: this.getTotalValue,
        setTotalValue: this.setTotalValue,
      });
    });
  }
}

export default Operations;
