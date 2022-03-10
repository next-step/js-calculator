class Operations {
  constructor(target, onClick) {
    this.onClick = onClick;
    this.$target = target;
    this.initEventListeners();
  }

  initEventListeners() {
    this.$target.addEventListener('click', this.onClickOperations.bind(this));
  }

  onClickOperations(event) {
    const clickedOperation = event.target.closest('.operation').innerHTML;
    this.onClick(clickedOperation);
  }
}

export default Operations;
