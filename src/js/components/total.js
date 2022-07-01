export class Total {
  element;
  constructor(element) {
    this.element = element;
  }

  setDetaultLabel() {
    this.element.innerHTML = defaultLabel;
  }

  setLabel(label) {
    this.element.innerHTML = label;
  }
}

const defaultLabel = "0";
