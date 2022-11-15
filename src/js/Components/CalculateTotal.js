import component from '../core/component.js';
export default class CalculateTotal extends component {
  constructor($target, state) {
    super($target, state);
    this.render();
  }

  render = () => {
    this.$target.textContent = this.state.total || '0';
  };

  setState = (newState) => {
    super.setState(newState);
  };
}
