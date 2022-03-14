import Operator from "./domain/Operator.js";
import CalculatorView from "./view/CalculatorView.js";
import {
  STATE_KEY,
  OPERATOR_SYMBOL,
  MESSAGE,
  MAX_OPERAND_LENGTH,
} from "./constant/index.js";

const initState = {
  total: 0,
  operator: "",
  leftOperand: "",
  rightOperand: "",
};

class Calculator {
  constructor({ $total, $digits, $modifiers, $operations }) {
    this.view = new CalculatorView({ $target: $total });
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
    this.state = { ...initState };
  }

  handleDigitClick() {
    this.$digits.addEventListener("click", ({ target }) => {
      const digit = target.textContent;
      this.setOperandByOperator(digit);
      this.view.renderStatus(this.state);
    });
  }

  handleModifierClick() {
    this.$modifiers.addEventListener("click", () => {
      this.setInitState();
      this.view.renderTotal(this.state.total);
    });
  }

  handleOperatorClick() {
    this.$operations.addEventListener("click", ({ target }) => {
      if (!this.validateOperateOrder()) return;

      const symbol = target.textContent;
      const symbolKey = target.dataset.symbol.toUpperCase();

      if (this.isResultButtonClicked(symbol)) {
        this.calculate();
        this.setTotalToOperand(this.state.total);
        this.view.renderTotal(this.state.total);
        return;
      }

      this.setState({ key: STATE_KEY.OPERATOR, newState: symbolKey });
      this.view.renderStatus(this.state);
    });
  }

  isResultButtonClicked(symbol) {
    return symbol === OPERATOR_SYMBOL.RESULT;
  }

  calculate() {
    const { operator, leftOperand, rightOperand } = this.state;
    const total = Operator[operator](Number(leftOperand), Number(rightOperand));

    this.setState({ key: STATE_KEY.TOTAL, newState: total });
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

  setState({ key, newState }) {
    this.state[key] = newState;
  }

  setOperand({ key, operand }) {
    if (this.validateOperandLength(operand)) {
      this.setState({
        key: key,
        newState: operand,
      });
    }
  }

  setTotalToOperand(total) {
    this.setInitState();
    this.setState({ key: STATE_KEY.TOTAL, newState: total });
    this.setState({ key: STATE_KEY.LEFT_OPERAND, newState: total });
  }

  validateOperandLength(operand) {
    try {
      if (operand.length > MAX_OPERAND_LENGTH) {
        throw Error(MESSAGE.OPERAND_LENGTH);
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  }

  validateOperateOrder() {
    const { leftOperand } = this.state;

    try {
      if (!leftOperand) {
        throw Error(MESSAGE.OPERATOR_ORDER);
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  }
}

export default Calculator;
