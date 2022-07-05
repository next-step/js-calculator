export class Total {
  element;
  defaultDisplay;
  constructor(element, defaultDisplay) {
    this.element = element;
    this.defaultDisplay = defaultDisplay;
    this.setDetaultDisplay();
  }

  setDetaultDisplay() {
    this.element.innerHTML = this.defaultDisplay;
  }

  setDisplay(display) {
    this.element.innerHTML = display;
  }
}
