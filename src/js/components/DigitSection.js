import DigitSectionButton from './DigitSectionButton.js';

export default class DigitSection {
  constructor($target, { onClick }) {
    const $digits = document.createElement('div');
    $digits.className = 'digits flex';

    for (let i = 9; i >= 0; i--) {
      new DigitSectionButton($digits, { number: i, onClick });
    }

    $target.appendChild($digits);
  }
}
