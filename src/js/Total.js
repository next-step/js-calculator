class Total {
  constructor({ $calculator, getTotalValue }) {
    this.$calculator = $calculator;
    this.totalValue = getTotalValue();
    this.render();
  }

  render() {
    this.$calculator.insertAdjacentHTML(
      "beforeend",
      `<h1 id="total">${this.totalValue}</h1>`
    );
  }
}

export default Total;
