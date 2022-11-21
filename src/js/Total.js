class Total {
  render({ $parent, totalValue }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<h1 id="total">${totalValue}</h1>`
    );
  }
}

export default Total;
