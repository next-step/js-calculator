import contains from "../utils/contains.js";
import operators from "../constants/operators.js";

const MAX_CONSECUTIVE_DIGIT = 3;

class Digit {
  constructor({ index }) {
    this.index = index;
  }

  setEvent({ totalValue, setTotalValue }) {
    const $digit = contains(".digit", this.index)[0];

    function isOverMaxConsecutive() {
      const sliced = totalValue
        .slice(totalValue.length - MAX_CONSECUTIVE_DIGIT, totalValue.length)
        .split("");
      if (
        sliced.length < MAX_CONSECUTIVE_DIGIT ||
        !!sliced.find((text) => operators.indexOf(text) !== -1)
      ) {
        return false;
      } else {
        return true;
      }
    }

    $digit.addEventListener("click", () => {
      if (totalValue === "0") {
        setTotalValue(`${this.index}`);
      } else if (isOverMaxConsecutive()) {
        alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
      } else {
        setTotalValue(`${totalValue}${this.index}`);
      }
    });
  }

  render({ $parent }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<button class="digit">${this.index}</button>`
    );
  }
}

export default Digit;
