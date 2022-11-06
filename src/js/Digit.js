import contains from "../utils/contains.js";
import operators from "../constants/operators.js";

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

    function isThreeConsecutive() {
      const sliced = totalValue
        .slice(totalValue.length - 2, totalValue.length)
        .split("");
      if (
        sliced.length < 2 ||
        !!sliced.find((text) => operators.indexOf(text) !== -1)
      ) {
        return false;
      } else {
        return true;
      }
    }

    $digit.addEventListener("click", () => {
      if (totalValue === "0") {
        this.setTotalValue(`${this.index}`);
      } else if (isThreeConsecutive()) {
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
