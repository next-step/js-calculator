import { messages, utilValues } from "../util/constant.js";

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

    try {
      this.updateDisplay(target.innerText);
    } catch (error) {
      console.log(error);
    }
  }

  handleOperatorBtnClick({ target }) {
    const curOperator = target.innerText;

    if (curOperator === "=") {
      this.handleCalcBtnClick();
    } else {
      this.leftNumber = this.$numberDisplay.innerText;
      this.currentOperator = curOperator;
    }
  }

  handleCalcBtnClick() {
    if (this.leftNumber === null || this.currentOperator === null || this.isSolved) {
      return;
    }
    this.rightNumber = this.$numberDisplay.innerText;

    try {
      const result = this.calculate();
      this.isSolved = true;
      this.updateDisplay(result);
    } catch (error) {
      this.isSolved = false;
      console.log(error);
    }
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

    if (this.$numberDisplay.innerText.length >= utilValues.MAX_NUMBER_LENGTH) {
      return;
    }

    const nextNumber = `${this.$numberDisplay.innerText}${number}`;
    if (isNaN(nextNumber)) {
      throw new Error(messages.MALFORM_NUMBER);
    } else {
      this.$numberDisplay.innerText = Number(nextNumber);
    }
  }

  calculate() {
    if (isNaN(this.leftNumber) || isNaN(this.rightNumber)) {
      throw new Error(messages.MALFORM_NUMBER);
    }

    const leftNumber = Number(this.leftNumber);
    const rightNumber = Number(this.rightNumber);

    switch (this.currentOperator) {
      case "/": {
        return Math.floor(leftNumber / rightNumber);
      }
      case "X": {
        return leftNumber * rightNumber;
      }
      case "-": {
        return leftNumber - rightNumber;
      }
      case "+": {
        return leftNumber + rightNumber;
      }
      default: {
        throw new Error(messages.MALFORM_OPERATOR);
      }
    }
  }
}

export default CalCulator;
