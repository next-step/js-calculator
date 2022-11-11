import Operation from "./Operation.js";
import operators from "../constants/operators.js";

class Operations {
  render({ $parent, totalValue, setTotalValue }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<div class="operations subgrid"></div>`
    );

    const $operations = document.querySelector(".operations");

    operators.forEach((operator) => {
      const OperationInstance = new Operation({
        operator,
        totalValue,
        setTotalValue,
      });

      // 반복해서 인스턴스를 생성하는 경우에는 render와 setEvent를 어떻게 분리할 수 있을까
      OperationInstance.render({ $parent: $operations, operator });
      OperationInstance.setEvent({ operator, totalValue, setTotalValue });
    });
  }
}

export default Operations;
