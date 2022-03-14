import { $, SELECTORS } from '../utils/selector.js';

export default function DigitsPanels({ onClick }) {
  this.$digitsPanels = $(SELECTORS.CLASS.DIGITS);

  this.setState = () => {};
  this.render = () => {};

  this.digitsPanelHandler = (event) => {
    const { target } = event;
    if (!target.classList.contains('digit')) return;

    const keypadNumber = target.textContent;
    onClick(keypadNumber);
  };

  this.$digitsPanels.addEventListener('click', this.digitsPanelHandler);
}
