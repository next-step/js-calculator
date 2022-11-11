import contains from "../utils/contains.js";
import operators from "../constants/operators.js";

const MAX_NUMBER_OF_DIGITS = 3;

class Digit {
  setEvent({ index, totalValue, setTotalValue }) {
    const $digit = contains(".digit", index)[0];

    function isOverThreeConsecutive() {
      const sliced = totalValue
        .slice(totalValue.length - MAX_NUMBER_OF_DIGITS, totalValue.length)
        .split("");
      if (
        sliced.length < MAX_NUMBER_OF_DIGITS ||
        !!sliced.find((text) => operators.indexOf(text) !== -1)
      ) {
        return false;
      } else {
        return true;
      }
    }

    $digit.addEventListener("click", () => {
      if (totalValue === "0") {
        setTotalValue(`${index}`);
      } else if (isOverThreeConsecutive()) {
        alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
      } else {
        setTotalValue(`${totalValue}${index}`);
      }
    });
  }

  render({ $parent, index }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<button class="digit">${index}</button>`
    );
  }
}

export default Digit;
