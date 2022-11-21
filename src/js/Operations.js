import Operation from "./Operation.js";
import operators from "../constants/operators.js";

class Operations {
  constructor() {
    this.OperatorInstances = operators.map(
      (operator) => new Operation({ operator })
    );
  }

  render({ $parent, totalValue, setTotalValue }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<div class="operations subgrid"></div>`
    );

    const $operations = document.querySelector(".operations");

    this.OperatorInstances.forEach((item) => {
      item.render({ $parent: $operations });
      item.setEvent({ totalValue, setTotalValue });
    });
  }
}

export default Operations;
