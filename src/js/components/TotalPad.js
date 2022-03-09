export default class TotalPad {
  #target;
  #total;

  constructor($target) {
    this.#target = $target;
    this.#total = document.createElement('h1');
    this.#total.id = 'total';
    this.#total.textContent = '0';

    this.#target.appendChild(this.#total);
  }

  updateText({ display }) {
    this.#total.textContent = display;
  }
}
