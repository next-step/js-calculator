export default class DigitSectionButton {
  constructor($target, { number, onClick }) {
    const $button = document.createElement('button');
    $button.className = 'digit';
    $button.textContent = number;
    $button.dataset.value = number;
    $button.addEventListener('click', onClick);
    $target.appendChild($button);
  }
}
