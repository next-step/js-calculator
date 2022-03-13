import constant from "../constant.js";

const { OPERATOR_SYMBOL } = constant;

class CalculatorView {
  constructor({ $target }) {
    this.$target = $target;
  }

  renderTotal(total) {
    this.$target.textContent = total;
  }

  renderStatus(state) {
    const { leftOperand, operator, rightOperand } = state;
    const SYMBOL = OPERATOR_SYMBOL[`${operator}`];
    const statusText = `${leftOperand ? leftOperand : ""}${
      SYMBOL ? SYMBOL : ""
    }${rightOperand ? rightOperand : ""}`;

    this.$target.textContent = statusText;
  }
}

export default CalculatorView;
