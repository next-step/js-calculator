export default function CalculateTotal({ $total, state }) {
  this.state = state;
  this.$total = $total;

  this.render = () => {
    this.$total.textContent = this.state.total || 0;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}
