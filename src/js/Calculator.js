import { STRATEGY } from './const/index.js';
import DigitStrategy from './strategies/DigitStrategy.js';
import ModifierStrategy from './strategies/ModifierStrategy.js';
import OperationStrategy from './strategies/OperationStrategy.js';
import { isEmptyArray, isNull } from './utils/common.js';

const strategyCommand = {
  [STRATEGY.MODIFIER]: ModifierStrategy,
  [STRATEGY.DIGIT]: DigitStrategy,
  [STRATEGY.OPERATOR]: OperationStrategy,
};

const calculator = {
  $calculator: null,
  $total: null,
  state: null,

  init({ $calculator, $total }, state) {
    this.$calculator = $calculator;
    this.$total = $total;
    this.state = { ...state };

    this.render();
    this.bindEvent();
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
    const strategy = strategyCommand[target.dataset?.strategy];

    try {
      this.mutateState(strategy?.mutateState(target, this.state));
      this.render();
    } catch ({ message }) {
      alert(message);
    }
  },

  mutateState(newState) {
    this.state = { ...this.state, ...newState };
  },
};

export default calculator.init.bind(calculator);
