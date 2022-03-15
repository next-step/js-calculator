import { DEFAULT_NUMBER, MODIFIER, OPERATION } from "./constants/calculator";
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

  calculate() {
    const { leftValue, rightValue, operation, totalValue } = this.state;

    if (operation === null) {
      alert(ALERT_MESSAGE.NO_OPERATION);
      
      return;
    }

    if (rightValue === null) {
      alert(ALERT_MESSAGE.NO_RIGHT_VALUE);

      return;
    }

    const calculatedValue = operationExecutor[operation](leftValue ?? totalValue, rightValue);

    this.state.totalValue = calculatedValue;
    this.renderDisplay(calculatedValue);

    // reset operation states
    this.state = {
      ...this.state,
      leftValue: null,
      rightValue: null,
      operation: null
    }
  }

  onDigitClick({ target }) {
    const currentValueKey =
      this.state.operation === null ? "leftValue" : "rightValue";
    const newValue =
      (this.state[currentValueKey] ?? 0) * 10 + Number(target.dataset.digit);
    this.setCurrentValue(currentValueKey, newValue);
  }

  onOperationClick({ target }) {
    const { operation } = target.dataset;

    if (operation === OPERATION.CALCULATION) {
      this.calculate();

      return;
    }

    if (this.state.operation !== null) {
      alert(ALERT_MESSAGE.EXCEEDED_OPERATION_COUNT);

      return;
    }
  }

  onModifierClick({ target }) {
    const handlers = {
      [MODIFIER.AC]: () => {
        this.state = { ...initialState };
        this.renderDisplay(DEFAULT_NUMBER);
      }
    }

    handlers[target.dataset.modifier]();
  }

  setCurrentValue(currentValueKey, newValue) {
    if (
      this.state[currentValueKey] &&
      this.state[currentValueKey].toString().length === MAXIMUM_DIGITS_LENGTH
    ) {
      alert(ALERT_MESSAGE.EXCEEDED_MAX_DIGIT_COUNT(MAXIMUM_DIGITS_LENGTH));
      return;
    }

    this.state[currentValueKey] = newValue;
    this.renderDisplay(newValue);
  }
}

export default Calculator;