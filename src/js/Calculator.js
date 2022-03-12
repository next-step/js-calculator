import { STRATEGY } from './const/index.js';
import digitStrategy from './strategies/DigitStrategy.js';
import operationStrategy from './strategies/OperationStrategy.js';
import { isEmptyArray, isNull } from './utils/common.js';

const defaultState = {
  x: null,
  operator: null,
  y: null,
};

const strategyCommand = {
  [STRATEGY.DIGIT]: digitStrategy,
  [STRATEGY.OPERATOR]: operationStrategy,
};

const calculator = {
  $calculator: null,
  $total: null,
  state: null,

  init({ $calculator, $total }) {
    this.$calculator = $calculator;
    this.$total = $total;

    this.initializeState();
    this.bindEvent();
  },

  initializeState() {
    this.mutateState(defaultState);
  },

  mutateState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  },

  render() {
    this.$total.innerText = this.convertToDisplayValue();
  },

  bindEvent() {
    this.$calculator.addEventListener('click', this.handleClick.bind(this));
  },

  convertToDisplayValue() {
    const values = Object.values(this.state);
    const displayValues = values.filter((v) => !isNull(v));
    return isEmptyArray(displayValues) ? '0' : displayValues.join('');
  },

  handleClick({ target }) {
    if (target.classList.contains('modifier')) {
      this.initializeState();
      return;
    }

    const strategy = strategyCommand[target.dataset?.strategy];

    try {
      this.mutateState(strategy?.(target, this.state));
    } catch ({ message }) {
      alert(message);
    }
  },
};

export default calculator.init.bind(calculator);
