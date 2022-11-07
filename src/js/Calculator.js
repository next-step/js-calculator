import Total from "./Total.js";
import Digits from "./Digits.js";
import Modifier from "./Modifier.js";
import Operations from "./Operations.js";

class Calculator {
  totalValue = "0";

  constructor({ $root }) {
    this.$root = $root;
    this.getTotalValue = this.getTotalValue.bind(this);
    this.setTotalValue = this.setTotalValue.bind(this);
    this.render();
  }

  getTotalValue() {
    return this.totalValue;
  }

  setTotalValue(newTotalValue) {
    this.totalValue = newTotalValue;
    this.render();
  }

  render() {
    this.$root.innerHTML = `<div class="calculator"></div>`;

    const $calculator = document.querySelector(".calculator");

    new Total({
      $calculator,
      getTotalValue: this.getTotalValue,
    });
    new Digits({
      $calculator,
      getTotalValue: this.getTotalValue,
      setTotalValue: this.setTotalValue,
    });
    new Modifier({
      $calculator,
      setTotalValue: this.setTotalValue,
    });
    new Operations({
      $calculator,
      getTotalValue: this.getTotalValue,
      setTotalValue: this.setTotalValue,
    });
  }
}

export default Calculator;
