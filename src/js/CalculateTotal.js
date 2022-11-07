export default function CalculateTotal({ $app, state }) {
  const $total = $app.querySelector('#total');
  this.state = state;

  this.render = () => {
    this.$total = $total;
    this.$total.textContent = this.state.total || '0';
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}
