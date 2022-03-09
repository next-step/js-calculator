export default class TotalPad {
  #target;

  constructor($target) {
    this.#target = $target;

    const $total = document.createElement('h1');
    $total.id = 'total';
    $total.textContent = '0';

    this.#target.appendChild($total);
  }
}
