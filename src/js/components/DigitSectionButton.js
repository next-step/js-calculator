export default class DigitSectionButton {
  #target;

  constructor($target, { number }) {
    this.#target = $target;

    const $button = document.createElement('button');
    $button.className = 'digit';
    $button.textContent = number;
    $button.dataset.value = number;

    this.#target.appendChild($button);
  }
}
