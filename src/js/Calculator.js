import constant from "./constant.js";

const initState = {
  total: 0,
  operator: "",
  leftOperand: null,
  rightOperand: null,
};

class Calculator {
  constructor({ $total, $digits, $modifiers, $operations }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$modifiers = $modifiers;
    this.$operations = $operations;
    this.state = {};
    this.init();
  }

  init() {
    this.setInitState();
    this.handleDigitClick();
    this.handleModifierClick();
    this.handleOperatorClick();
  }

  setInitState() {
    this.state = initState;
  }

  setState({ key, newState }) {
    this.state[key] = newState;
  }

  setOperand(operand) {
    const { STATE_KEY } = constant;
    const { leftOperand } = this.state;

    if (!leftOperand) {
      this.setState({ key: STATE_KEY.LEFT_OPERAND, newState: operand });
      return;
    }

    this.setState({ key: STATE_KEY.RIGHT_OPERAND, newState: operand });
  }

  handleDigitClick() {
    this.$digits.addEventListener("click", ({ target }) => {
      const digit = target.textContent;
      this.setOperand(digit);
    });
  }

  handleModifierClick() {
    this.$modifiers.addEventListener("click", () => {});
  }

  handleOperatorClick() {
    this.$operations.addEventListener("click", ({ target }) => {
      this.operator = target.dataset.operator.toUpperCase();
    });
  }
}

export default Calculator;
