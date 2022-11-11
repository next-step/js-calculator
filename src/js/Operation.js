import contains from "../utils/contains.js";
import operators from "../constants/operators.js";

class Operation {
  setEvent({ operator, totalValue, setTotalValue }) {
    const $operation = contains(".operation", operator)[0];
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
      } else if (operator === "=") {
        calculate();
      } else {
        setTotalValue(`${totalValue}${operator}`);
      }
    });
  }

  render({ $parent, operator }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<button class="operation">${operator}</button>`
    );
  }
}

export default Operation;
