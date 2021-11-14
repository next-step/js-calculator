export class Modifier {
  constructor(element, display, state) {
    this.element = element;
    this.display = display;
    this.state = state;

    this.reset = this.reset.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  init() {
    this.element.addEventListener('click', () => {
      this.reset();
    });
  }
  reset() {
    this.state.currInput = '';
    this.state.prevInput = '';
    this.display('0');
  }
}
