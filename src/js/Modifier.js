import contains from "../utils/contains.js";

class Modifier {
  constructor({ $calculator, setTotalValue }) {
    this.$calculator = $calculator;
    this.setTotalValue = setTotalValue;
    this.render();
    this.setEvent();
  }

  setEvent() {
    const $modifier = contains(".modifier", "AC")[0];
    $modifier.addEventListener("click", () => {
      this.setTotalValue("0");
    });
  }

  render() {
    this.$calculator.insertAdjacentHTML(
      "beforeend",
      `<div class="modifiers subgrid">
        <button class="modifier">AC</button>
      </div>`
    );
  }
}

export default Modifier;
