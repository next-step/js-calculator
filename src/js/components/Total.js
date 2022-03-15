import { INIT_STATE } from '../constants.js';

class Total {
  constructor(target, state) {
    this.$target = target;
    this.state = state;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state;
  }

  isClean() {
    return this.state === INIT_STATE.currentTotal;
  }
}

export default Total;
