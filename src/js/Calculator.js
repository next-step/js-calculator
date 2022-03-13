import Operator from "./domain/Operator.js";
import CalculatorView from "./view/CalculatorView.js";
import constant from "./constant.js";

const { STATE_KEY, MESSAGE, MAX_OPERAND_LENGTH, OPERATOR_SYMBOL } = constant;
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

  validateOperandLength(operand) {
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

  validateOperateOrder() {
    const { leftOperand } = this.state;

    try {
      if (!leftOperand) {
        throw Error(MESSAGE.OPERATOR_ORDER);
      }
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  }

  calculate() {
    const { operator, leftOperand, rightOperand } = this.state;
    const total = Operator[`${operator}`](
      Number(leftOperand),
      Number(rightOperand)
    );

    this.setState({ key: STATE_KEY.TOTAL, newState: total });
  }
}

export default Calculator;
