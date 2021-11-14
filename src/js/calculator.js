import { TYPE, MAX_LENGTH, OPERATIONS, ALERT_MESSAGE } from './constants.js';
import { $, operation } from './utils.js';

const initialState = [0];

export default class Calculator {
  #state;

  constructor({ $target }) {
    this.$target = $target;
    this.$result = $('#total');
    this.#state = [...initialState];

    this.bindEvents();
  }

  isOperation(value) {
    return typeof value === 'string';
  }

  bindEvents() {
    this.$target.addEventListener('click', ({ target }) => {
      const { className, dataset } = target;
      const flag = this.checkTargetType(className, dataset);

      if (!flag) return;
      this.$result.textContent = this.#state.join('');
    });
  }

  checkTargetType(type, value) {
    switch (type) {
      case TYPE.DIGIT:
        return this.onClickDigit(value);
      case TYPE.OPERATION:
        return this.onClickOperation(value);
      case TYPE.MODIFIER:
        return this.onClickModifier();
      default:
        return false;
    }
  }

  setState(newState) {
    this.#state = [...this.#state, ...newState];
  }

  onClickDigit(value) {
    const { digit } = value;
    const lastValue = this.#state.pop();

    if (lastValue && String(lastValue).length >= MAX_LENGTH) {
      this.setState([Number(`${String(lastValue).slice(0, -1)}${digit}`)]);
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return true;
    }

    if (this.isOperation(lastValue)) {
      this.setState([lastValue, Number(digit)]);
      return true;
    }

    const nextValue = lastValue
      ? Number(`${lastValue}${digit}`)
      : Number(`${digit}`);
    this.setState([nextValue]);
    return true;
  }

  onClickOperation(value) {
    const { operation } = value;
    const lastValue = this.#state[this.#state.length - 1];
    if (!this.#state.length || this.isOperation(lastValue)) {
      alert(ALERT_MESSAGE.OPERATION_LIMIT);
      return false;
    }

    if (operation === OPERATIONS.EQUAL) {
      this.#state = [this.calculateNumbers()];
      return true;
    }

    if (this.#state.length >= MAX_LENGTH) {
      this.#state = [this.calculateNumbers()];
    }

    this.setState([operation]);
    return true;
  }

  onClickModifier() {
    this.#state = [...initialState];
    return true;
  }

  calculateNumbers() {
    let type = '';

    return this.#state.reduce((prev, next) => {
      if (this.isOperation(next)) {
        type = next;
        return prev;
      }

      if (!prev) return prev + next;
      return operation[type](prev, next);
    }, 0);
  }
}
