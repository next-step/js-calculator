import { DEFAULT_NUMBER, OPERATION } from "./constants/calculator";
import { ALERT_MESSAGE } from "./constants/messages";
import { MAXIMUM_DIGITS_LENGTH } from "./utils/constant";

const operationExecutor = {
  [OPERATION.ADDITION]: (leftValue, rightValue) => leftValue + rightValue,
  [OPERATION.SUBTRACTION]: (leftValue, rightValue) => leftValue - rightValue,
  [OPERATION.MULTIPLICATION]: (leftValue, rightValue) => leftValue * rightValue,
  [OPERATION.DIVISION]: (leftValue, rightValue) =>
    Math.floor(leftValue / rightValue),
};

const initialState = {
  totalValue: DEFAULT_NUMBER,
  leftValue: null,
  rightValue: null,
  operation: null,
};

class Calculator {
  constructor({ $total, $digits, $operations, $modifiers }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$modifiers = $modifiers;
    this.$operations = $operations;
    this.state = {
      ...initialState,
    };
  }

  init() {
    this.$digits.addEventListener("click", this.onDigitClick.bind(this));
    this.$operations.addEventListener(
      "click",
      this.onOperationClick.bind(this)
    );
    this.$modifiers.addEventListener("click", this.onModifierClick.bind(this));
  }

  renderDisplay(value) {
    this.$total.textContent = value;
  }

  onDigitClick({ target }) {
    const currentValueKey =
      this.state.operation === null ? "leftValue" : "rightValue";
    if (
      this.state[currentValueKey] &&
      this.state[currentValueKey].toString().length === MAXIMUM_DIGITS_LENGTH
    ) {
      alert(ALERT_MESSAGE.EXCEEDED_MAX_DIGIT_COUNT(MAXIMUM_DIGITS_LENGTH));
      return;
    }

    this.state[currentValueKey] =
      (this.state[currentValueKey] ?? 0) * 10 + Number(target.dataset.digit);
    this.renderDisplay(this.state[currentValueKey]);
  }
}
