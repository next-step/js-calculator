class CalCulator {
  constructor() {
    this.$numberBtnGrp = document.querySelector(".digits");
    this.$operatorBtnGrp = document.querySelector(".operations");
    this.$resetBtn = document.querySelector(".modifier");
    this.$numberDisplay = document.querySelector("#total");

    this.currentOperator = null;
    this.inputNumbers = [null, null];
    this.isReset = false;

    this.initEvent();
  }

  initEvent() {
    this.$numberBtnGrp.addEventListener("click", this.handleNumberBtnClick.bind(this));
    this.$operatorBtnGrp.addEventListener("click", this.handleOperatorBtnClick.bind(this));
    this.$resetBtn.addEventListener("click", this.resetDisplay.bind(this));
  }

  handleNumberBtnClick(e) {
    const { target } = e;
    this.updateDisplay(target.innerText);
  }

  handleOperatorBtnClick(e) {
    const { target } = e;
    this.currentOperator = target.innerText;
  }

  resetDisplay() {
    this.$numberDisplay.innerText = 0;
    this.currentOperator = null;
    this.isReset = false;
  }

  updateDisplay(number) {
    if (this.currentOperator && !this.isReset) {
      this.$numberDisplay.innerText = 0;
      this.isReset = true;
    }
    if (this.$numberDisplay.innerText.length >= 3) {
      return;
    }
    const nextNumber = Number(`${this.$numberDisplay.innerText}${number}`);
    this.$numberDisplay.innerText = nextNumber;
  }
}

export default CalCulator;
