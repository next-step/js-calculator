export default class TotalPad {
  #total;

  constructor($target) {
    this.#total = document.createElement('h1');
    this.#total.id = 'total';
    this.#total.textContent = '0';
    $target.appendChild(this.#total);
  }
}
