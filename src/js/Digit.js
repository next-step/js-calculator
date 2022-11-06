import contains from "../utils/contains.js";

class Digit {
  constructor({ $digits, index, getTotalValue, setTotalValue }) {
    this.$digits = $digits;
    this.index = index;
    this.getTotalValue = getTotalValue;
    this.setTotalValue = setTotalValue;
    this.render();
    this.setEvent();
  }

  setEvent() {
    const $digit = contains(".digit", this.index)[0];
    const totalValue = this.getTotalValue();
    $digit.addEventListener("click", () => {
      if (totalValue === "0") {
        this.setTotalValue(`${this.index}`);
      } else if (totalValue.length >= 3) {
        alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
      } else {
        this.setTotalValue(`${totalValue}${this.index}`);
      }
    });
  }

  render() {
    this.$digits.insertAdjacentHTML(
      "beforeend",
      `<button class="digit">${this.index}</button>`
    );
  }
}

export default Digit;
