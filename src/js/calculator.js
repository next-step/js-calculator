import {
  DEFAULT_NUMBER,
  MAX_DIGIT_COUNT,
  MODIFIER,
  OPERATION,
} from "./constants/calculator.js";
import { ALERT_MESSAGE } from "./constants/messages.js";

const operationExecutor = {
  [OPERATION.ADDITION]: (leftValue, rightValue) => leftValue + rightValue,
  [OPERATION.SUBTRACTION]: (leftValue, rightValue) => leftValue - rightValue,
  [OPERATION.MULTIPLICATION]: (leftValue, rightValue) => leftValue * rightValue,
  [OPERATION.DIVISTION]: (leftValue, rightValue) =>
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
    this.state = { ...initialState };
  }

  init() {
    this.$digits.addEventListener("click", this.onDigitClick.bind(this));
    this.$operations.addEventListener(
      "click",
      this.onOperationClick.bind(this)
    );
    this.$modifiers.addEventListener("click", this.onModifierClick.bind(this));
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
    } else {
      this.setOperation(operation);
    }
  }

  onModifierClick({ target }) {
    const handlers = {
      [MODIFIER.ALL_CLEAR]: () => this.resetAll(),
    };

    handlers[target.dataset.modifier]();
  }

  setCurrentValue(currentValueKey, newValue) {
    const currentValue = this.state[currentValueKey];

    if (currentValue && currentValue.toString().length === MAX_DIGIT_COUNT) {
      alert(ALERT_MESSAGE.EXCEEDED_MAX_DIGIT_COUNT(MAX_DIGIT_COUNT));

      return;
    }

    this.state[currentValueKey] = newValue;
    this.renderDisplay(newValue);
  }

  setOperation(operation) {
    if (this.state.operation !== null) {
      alert(ALERT_MESSAGE.INVALID_EXPRESSION.EXCEEDED_OPERATION_COUNT);

      return;
    }

    this.state.operation = operation;
  }

  calculate() {
    const { leftValue, rightValue, operation, totalValue } = this.state;

    if (operation === null) {
      alert(ALERT_MESSAGE.INVALID_EXPRESSION.NO_OPERATION);

      return;
    }

    if (rightValue === null) {
      alert(ALERT_MESSAGE.INVALID_EXPRESSION.NO_RIGHT_VALUE);

      return;
    }

    const calculatedValue = operationExecutor[operation](
      leftValue ?? totalValue,
      rightValue
    );

    this.state.totalValue = calculatedValue;
    this.renderDisplay(calculatedValue);
    this.resetOperationStates();
  }

  resetOperationStates() {
    this.state = {
      ...this.state,
      leftValue: null,
      rightValue: null,
      operation: null,
    };
  }

  resetAll() {
    this.state = { ...initialState };
    this.renderDisplay(DEFAULT_NUMBER);
  }

  renderDisplay(value) {
    this.$total.textContent = value;
  }
}

export default Calculator;
