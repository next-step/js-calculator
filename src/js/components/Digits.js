class Digits {
  constructor({ element, onClick }) {
    this.element = element;
    this.bindEvents(onClick);
  }

  bindEvents(onClick) {
    this.element.addEventListener('click', ({ target }) => {
      if (target.className !== 'digit') {
        return;
      }

      onClick(target.innerText);
    });
  }
}

export default Digits;
