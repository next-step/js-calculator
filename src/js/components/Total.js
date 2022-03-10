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
}

export default Total;
