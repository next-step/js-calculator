class Total {
  constructor({ element }) {
    this.element = element;
  }

  render({ stack }) {
    this.element.innerText = stack.length ? stack.join('') : 0;
  }
}

export default Total;
