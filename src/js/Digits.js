import Digit from "./Digit.js";

class Digits {
  render({ $parent, totalValue, setTotalValue }) {
    $parent.insertAdjacentHTML("beforeend", `<div class="digits flex"></div>`);

    const $digits = document.querySelector(".digits");

    for (let index = 9; index >= 0; index--) {
      const DigitInstance = new Digit();

      // 반복해서 인스턴스를 생성하는 경우에는 render와 setEvent를 어떻게 분리할 수 있을까
      DigitInstance.render({ $parent: $digits, index });
      DigitInstance.setEvent({ index, totalValue, setTotalValue });
    }
  }
}

export default Digits;
