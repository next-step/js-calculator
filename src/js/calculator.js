class CalCulator {
  constructor() {
    const $numberBtnGrp = document.querySelector(".digits");
    const $operatorBtnGrp = document.querySelector(".operations");
    this.$numberDisplay = document.querySelector("#total");

    $numberBtnGrp.addEventListener("click", this.handleNumberBtnClick.bind(this));
    $operatorBtnGrp.addEventListener("click", this.handleOperatorBtnClick);
  }

  handleNumberBtnClick(e) {
    const { target } = e;
    this.updateDisplay(target.innerText);
  }

  handleOperatorBtnClick(e) {
    const { target } = e;
  }

  updateDisplay(number) {
    const nextNumber = Number(`${$numberDisplay.innerText}${number}`);
    this.$numberDisplay.innerText = nextNumber;
  }
}

export default CalCulator;
