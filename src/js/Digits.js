import Digit from "./Digit.js";

const DIGIT_COUNT = 10;

class Digits {
  constructor() {
    this.DigitInstances = Array.from(Array(DIGIT_COUNT).keys())
      .reverse()
      .map((index) => new Digit({ index }));
  }

  render({ $parent, totalValue, setTotalValue }) {
    $parent.insertAdjacentHTML("beforeend", `<div class="digits flex"></div>`);

    const $digits = document.querySelector(".digits");

    this.DigitInstances.forEach((item) => {
      item.render({ $parent: $digits });
      item.setEvent({ totalValue, setTotalValue });
    });
  }
}

export default Digits;
