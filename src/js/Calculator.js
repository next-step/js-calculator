import constant from "./constant.js";

const { STATE_KEY, MESSAGE } = constant;

const initState = {
  total: 0,
  operator: "",
  leftOperand: "",
  rightOperand: "",
};
//TODO: 쓸때 숫자로 바꿔주기

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

  setOperandByOperator(operand) {
    const { operator, leftOperand, rightOperand } = this.state;

    if (!operator) {
      const newLeftOperand = leftOperand + operand;
      this.setOperand({
        key: STATE_KEY.LEFT_OPERAND,
        operand: newLeftOperand,
      });
      return;
    }

    const newRightOperand = rightOperand + operand;
    this.setOperand({
      key: STATE_KEY.RIGHT_OPERAND,
      operand: newRightOperand,
    });
  }

  setOperand({ key, operand }) {
    if (this.validateOperandLength(operand)) {
      this.setState({
        key: key,
        newState: operand,
      });
    }
  }

  validateOperandLength(operand) {
    const MAX_OPERAND_LENGTH = 3;

    try {
      if (operand.length > MAX_OPERAND_LENGTH) {
        throw Error(MESSAGE.OPERAND_LENGTH);
      }
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  }

  handleDigitClick() {
    this.$digits.addEventListener("click", ({ target }) => {
      const digit = target.textContent;
      this.setOperandByOperator(digit);
    });
  }

  handleModifierClick() {
    this.$modifiers.addEventListener("click", this.setInitState.bind(this));
  }

  handleOperatorClick() {
    this.$operations.addEventListener("click", ({ target }) => {
      const symbol = target.dataset.symbol.toUpperCase();
      this.setState({ key: STATE_KEY.OPERATOR, newState: symbol });
    });
  }
}

export default Calculator;
