import { DOM } from '../constants.js';

class Digits {
  constructor(target, onClick) {
    this.$target = target;
    this.onClick = onClick;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$target.addEventListener('click', this.onClickDigits.bind(this));
  }

  onClickDigits(event) {
    const clickedDigit = event.target.closest(DOM.digit).innerHTML;
    this.onClick(clickedDigit);
  }
}

export default Digits;
