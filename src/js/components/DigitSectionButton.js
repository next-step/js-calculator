export default class DigitSectionButton {
  #target;

  constructor($target, { number, onClick }) {
    this.#target = $target;

    const $button = document.createElement('button');
    $button.className = 'digit';
    $button.textContent = number;
    $button.dataset.value = number;
    $button.addEventListener('click', onClick);

    this.#target.appendChild($button);
  }
}
