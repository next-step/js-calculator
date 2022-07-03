class CalCulator {
  constructor() {
    this.$numberBtnGrp = document.querySelector(".digits");
    this.$operatorBtnGrp = document.querySelector(".operations");
    this.$resetBtn = document.querySelector(".modifier");
    this.$numberDisplay = document.querySelector("#total");

    this.currentOperator = null;
    this.leftNumber = null;
    this.rightNumber = null;
    this.operatorReset = false;
    this.isSolved = false;

    this.initEvent();
  }

  initEvent() {
    this.$numberBtnGrp.addEventListener("click", this.handleNumberBtnClick.bind(this));
    this.$operatorBtnGrp.addEventListener("click", this.handleOperatorBtnClick.bind(this));
    this.$resetBtn.addEventListener("click", this.resetDisplay.bind(this));
  }

  handleNumberBtnClick({ target }) {
    if (this.isSolved) {
      return;
    }
    this.updateDisplay(target.innerText);
  }

  handleOperatorBtnClick({ target }) {
    if (target.innerText === "=") {
      this.handleCalcBtnClick();
    } else {
      this.leftNumber = Number(this.$numberDisplay.innerText);
      this.currentOperator = target.innerText;
    }
  }

  handleCalcBtnClick() {
    if (this.leftNumber === null || this.currentOperator === null || this.isSolved) {
      return;
    }
    this.rightNumber = Number(this.$numberDisplay.innerText);
    const result = this.calculate();
    this.isSolved = true;

    this.updateDisplay(result);
  }

  resetDisplay() {
    this.$numberDisplay.innerText = 0;
    this.currentOperator = null;
    this.operatorReset = false;
    this.isSolved = false;
  }

  updateDisplay(number) {
    if (this.isSolved) {
      this.$numberDisplay.innerText = number;
      return;
    }

    if (this.currentOperator && !this.operatorReset) {
      this.$numberDisplay.innerText = 0;
      this.operatorReset = true;
    }

    if (this.$numberDisplay.innerText.length >= 3) {
      return;
    }

    const nextNumber = Number(`${this.$numberDisplay.innerText}${number}`);
    this.$numberDisplay.innerText = nextNumber;
  }

  calculate() {
    switch (this.currentOperator) {
      case "/": {
        return Math.floor(this.leftNumber / this.rightNumber);
      }
      case "X": {
        return this.leftNumber * this.rightNumber;
      }
      case "-": {
        return this.leftNumber - this.rightNumber;
      }
      case "+": {
        return this.leftNumber + this.rightNumber;
      }
    }
  }
}

export default CalCulator;
