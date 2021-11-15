import { Operators } from './constants.js';

class Calculator {
  $calcScreen = null;

  putValues = {
    prevNumStr: "0",
    nextNumStr: "",
    selectedOperatorStr: ""
  }

  constructor() {
    this.$calcScreen = document.querySelector('#total');
    this.initEvent();
  }

  allClear() {
    this.putValues.prevNumStr = "0";
    this.putValues.nextNumStr = '';
    this.putValues.selectedOperatorStr = '';
  }

  isMaximumDigits = (text, maxNum) => {
    return (`${text}`).length >= maxNum;
  }

  isZeroText = (text) => {
    return text === "0";
  }

  getTotal = (operatorText, num1, num2) => {
    const { Add, Subtract, Multiply, Divide } = Operators;
    
    switch (operatorText) {
      case Add:
        return num1 + num2;
      case Subtract:
        return num1 - num2;
      case Divide:
        return Math.floor(num1 / num2);
      case Multiply:
        return num1 * num2;
      default:
        return false;
    }
  }

  print() {
    const { prevNumStr, nextNumStr, selectedOperatorStr } = this.putValues;
    this.$calcScreen.innerText = `${prevNumStr}${selectedOperatorStr}${nextNumStr}`;
  }

  setNumberStr(selectedNum) {
    const numberKey = this.putValues.selectedOperatorStr ? "nextNumStr" : "prevNumStr";

    if (this.isMaximumDigits(this.putValues[numberKey], 3)) {
      alert("숫자는 세 자리까지만 입력 가능합니다!");
      return false;
    }

    this.putValues[numberKey] = this.isZeroText(this.putValues[numberKey]) ? selectedNum : this.putValues[numberKey] + selectedNum;
  }

  calculate(putedOperatorStr) {
    const { Equal } = Operators;
    const { prevNumStr, nextNumStr, selectedOperatorStr } = this.putValues;
    const hasOnlyDigits = prevNumStr && !selectedOperatorStr && !nextNumStr;
    const hasFirstDigitsAndOperator = prevNumStr && selectedOperatorStr && !nextNumStr;

    if (this.isZeroText(prevNumStr)) {
      alert("숫자를 먼저 입력 후 연산자를 입력해주세요.");
      return false;
    }

    if (hasFirstDigitsAndOperator || hasOnlyDigits) {
      this.putValues.selectedOperatorStr = putedOperatorStr === Equal ? '' : putedOperatorStr;
      return false;
    }

    if (prevNumStr && selectedOperatorStr && nextNumStr) {
      this.putValues.prevNumStr = `${this.getTotal(selectedOperatorStr, Number(prevNumStr), Number(nextNumStr))}`;
      this.putValues.selectedOperatorStr = putedOperatorStr === Equal ? '' : putedOperatorStr;
      this.putValues.nextNumStr = '';
    }

  }

  initEvent() {
    const $digits = document.querySelector(".digits");
    const $modifier = document.querySelector(".modifier");
    const $operations = document.querySelector(".operations");

    const numberClickhandler = (e) => {
      e.preventDefault;

      this.setNumberStr(e.target.innerText);
      this.print();
    }

    const allClearClickHandelr = (e) => {
      e.preventDefault;

      this.allClear();
      this.print();
    }

    const operatorClickHandler = (e) => {
      e.preventDefault;

      this.calculate(e.target.innerText);
      this.print();
    }

    $digits.addEventListener('click', numberClickhandler);
    $modifier.addEventListener('click', allClearClickHandelr);
    $operations.addEventListener('click', operatorClickHandler);
  }
}

export default Calculator;
