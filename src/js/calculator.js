class CalCulator {
  constructor() {
    const $numberBtnGrp = document.querySelector(".digits");
    const $operatorBtnGrp = document.querySelector(".operations");

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
    const $numberDisplay = document.querySelector("#total");
    const nextNumber = Number(`${$numberDisplay.innerText}${number}`);

    $numberDisplay.innerText = nextNumber;
  }
}

export default CalCulator;
