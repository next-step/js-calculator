import DigitSectionButton from './DigitSectionButton.js';

export default class DigitSection {
  #target;
  constructor($target, { onClick }) {
    this.#target = $target;

    const $digits = document.createElement('div');
    $digits.className = 'digits flex';

    for (let i = 9; i >= 0; i--) {
      new DigitSectionButton($digits, { number: i, onClick });
    }

    this.#target.appendChild($digits);
  }
}
