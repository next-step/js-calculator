import Total from "./Total.js";
import Digits from "./Digits.js";
import Modifier from "./Modifier.js";
import Operations from "./Operations.js";

class Calculator {
  totalValue = "0";

  constructor() {
    this.setTotalValue = this.setTotalValue.bind(this);

    this.Total = new Total();
    this.Digits = new Digits();
    this.Modifier = new Modifier();
    this.Operations = new Operations();
  }

  setTotalValue(newTotalValue) {
    this.totalValue = newTotalValue;
    this.render();
    this.setEvent();
  }

  setEvent() {
    this.Modifier.setEvent({ setTotalValue: this.setTotalValue });
  }

  render() {
    const $root = document.querySelector("#app");

    $root.innerHTML = `<div class="calculator"></div>`;

    const $calculator = document.querySelector(".calculator");

    this.Total.render({ $parent: $calculator, totalValue: this.totalValue });
    this.Digits.render({
      $parent: $calculator,
      totalValue: this.totalValue,
      setTotalValue: this.setTotalValue,
    });
    this.Modifier.render({ $parent: $calculator });
    this.Operations.render({
      $parent: $calculator,
      totalValue: this.totalValue,
      setTotalValue: this.setTotalValue,
    });
  }
}

export default Calculator;
