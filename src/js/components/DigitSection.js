import DigitSectionButton from './DigitSectionButton.js';

const DigitSection = ($target, { onClick }) => {
  const $digits = document.createElement('div');
  $digits.className = 'digits flex';

  for (let i = 9; i >= 0; i--) {
    DigitSectionButton($digits, { number: i, onClick });
  }

  $target.appendChild($digits);
};

export default DigitSection;
