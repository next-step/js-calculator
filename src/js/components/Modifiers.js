class Modifiers {
  constructor({ element, onClick }) {
    this.element = element;
    this.bindEvents(onClick);
  }

  bindEvents(onClick) {
    this.element.addEventListener('click', ({ target }) => {
      if (target.className !== 'modifier') {
        return;
      }

      onClick(target.innerText);
    });
  }
}

export default Modifiers;
