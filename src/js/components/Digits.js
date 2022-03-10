class Digits {
  constructor(target, onClick) {
    this.onClick = onClick;
    this.$target = target;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$target.addEventListener('click', this.onClickDigits.bind(this));
  }

  onClickDigits(event) {
    const clickedDigit = event.target.closest('.digit').innerHTML;
    this.onClick(clickedDigit);
  }
}

export default Digits;
