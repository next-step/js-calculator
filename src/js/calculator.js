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

  bindEvents() {
    this.$target.addEventListener('click', ({ target }) => {
      const { className, dataset } = target;
      const flag = this.setEvent(className, dataset);

      if (!flag) return;
      this.$result.textContent = this.#state.join('');
    });
  }

  setEvent(type, value) {
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

  onClickDigit(value) {
    const { digit } = value;
    const lastValue = this.#state.pop();

    if (lastValue && String(lastValue).length >= MAX_LENGTH) {
      alert(ALERT_MESSAGE.MAX_NUMBER);
      return false;
    }

    if (typeof lastValue === 'string') {
      this.#state = [...this.#state, lastValue, Number(digit)];
      return true;
    }

    const nextValue = lastValue
      ? Number(`${lastValue}${digit}`)
      : Number(`${digit}`);
    this.#state = [...this.#state, nextValue];
    return true;
  }

  onClickOperation(value) {
    const { operation } = value;
    const lastValue = this.#state[this.#state.length - 1];
    if (!this.#state.length || typeof lastValue === 'string') {
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

    this.#state = [...this.#state, operation];
    return true;
  }

  onClickModifier() {
    this.#state = [...initialState];
    return true;
  }

  calculateNumbers() {
    let type = '';

    return this.#state.reduce((prev, next) => {
      if (typeof next === 'string') {
        type = next;
        return prev;
      }

      if (!prev) return prev + next;
      return operation[type](prev, next);
    }, 0);
  }
}
