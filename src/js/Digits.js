import Digit from "./Digit.js";

class Digits {
  constructor({ $calculator, getTotalValue, setTotalValue }) {
    this.$calculator = $calculator;
    this.getTotalValue = getTotalValue;
    this.setTotalValue = setTotalValue;
    this.render();
  }

  render() {
    this.$calculator.insertAdjacentHTML(
      "beforeend",
      `<div class="digits flex"></div>`
    );

    const $digits = document.querySelector(".digits");

    for (let index = 9; index >= 0; index--) {
      new Digit({
        $digits,
        index,
        getTotalValue: this.getTotalValue,
        setTotalValue: this.setTotalValue,
      });
    }
  }
}

export default Digits;
