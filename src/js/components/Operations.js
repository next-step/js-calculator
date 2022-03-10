class Operations {
  constructor(target, onClick) {
    this.onClick = onClick;
    this.$target = target;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$target.addEventListener('click', this.handleDigitsClick.bind(this));
  }

  handleDigitsClick(event) {
    const clickedDigit = event.target.closest('.operation').innerHTML;
    this.onClick(clickedDigit);
  }
}

export default Operations;
