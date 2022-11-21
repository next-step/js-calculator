import contains from "../utils/contains.js";
import operators from "../constants/operators.js";

class Operation {
  constructor({ operator }) {
    this.operator = operator;
  }

  setEvent({ totalValue, setTotalValue }) {
    const $operation = contains(".operation", this.operator)[0];
    const isLastValueOperator =
      operators.indexOf(totalValue[totalValue.length - 1]) !== -1;

    function calculate() {
      const getResult = new Function(`return ${totalValue.replace("X", "*")}`);
      const result = Math.floor(getResult());
      setTotalValue(String(result));
    }

    $operation.addEventListener("click", () => {
      if (isLastValueOperator) {
        alert("연산자는 연속해서 입력할 수 없습니다.");
      } else if (totalValue === "0") {
        alert("숫자를 먼저 입력하세요.");
      } else if (this.operator === "=") {
        calculate();
      } else {
        setTotalValue(`${totalValue}${this.operator}`);
      }
    });
  }

  render({ $parent }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<button class="operation">${this.operator}</button>`
    );
  }
}

export default Operation;
