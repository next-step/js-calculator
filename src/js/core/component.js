import { checkInitialState } from '../utils/validate.js';

export default class Component {
  constructor($target, state = { total: '', digitCount: 0, operation: '' }) {
    this.$target = $target;
    this.state = checkInitialState(state);
  }
  render() {}
  setState(newState) {
    this.state = newState;
    this.render();
  }
}
