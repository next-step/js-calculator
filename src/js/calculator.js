class CalCulator {
  constructor() {
    const $numberBtnGrp = document.querySelector(".digits");
    const $operatorBtnGrp = document.querySelector(".operations");
    const $resetBtn = document.querySelector(".modifier");
    this.$numberDisplay = document.querySelector("#total");

    $numberBtnGrp.addEventListener("click", this.handleNumberBtnClick.bind(this));
    $operatorBtnGrp.addEventListener("click", this.handleOperatorBtnClick);
    $resetBtn.addEventListener("click", this.resetDisplay.bind(this));
  }

  handleNumberBtnClick(e) {
    const { target } = e;
    this.updateDisplay(target.innerText);
  }

  handleOperatorBtnClick(e) {
    const { target } = e;
  }

  resetDisplay() {
    this.$numberDisplay.innerHTML = 0;
  }

  updateDisplay(number) {
    const nextNumber = Number(`${this.$numberDisplay.innerText}${number}`);
    this.$numberDisplay.innerText = nextNumber;
  }
}

export default CalCulator;
