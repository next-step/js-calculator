class Total {
  constructor({ target, stack }) {
    this.stack = stack;
    this.element = document.querySelector(target);
  }

  render({ stack }) {
    this.element.innerText = stack.length ? stack.join(' ') : 0;
  }
}

export default Total;
