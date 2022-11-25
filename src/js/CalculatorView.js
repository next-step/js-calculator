import ERROR_MESSAGE from "../const/ERROR_MESSAGE.js";
import Calculator from "./Calculator.js";

export default function CalculatorView(calculator, $target) {
  if (!(calculator instanceof Calculator)) {
    throw new Error();
  }
  this.calculator = calculator;

  const $result = $target.querySelector("#total");
  const $digits = $target.querySelector(".digits");
  const $operations = $target.querySelector(".operations");
  const $modifiers = $target.querySelector(".modifiers");

  this.isValidInput = (numstr) => {
    if (numstr.length > 3) throw new Error(ERROR_MESSAGE.WRONG_NUMINPUT);
    if (numstr === null || numstr === "undefined" || numstr === "")
      throw new Error(ERROR_MESSAGE.WRONG_NUMINPUT);
    return true;
  };

  this.updateNumber = (inputNum) => {
    // 첫번째 숫자, 두번째 숫자
    const prevNum = this.calculator.getOperator()
      ? this.calculator.getCur() || 0
      : this.calculator.getPrev() || 0;
    const nextNum = Number(String(prevNum) + String(inputNum));
    if (String(nextNum).length > 3) {
      throw ERROR_MESSAGE.WRONG_NUMINPUT;
    }

    $result.textContent = nextNum;
    if (!this.calculator.getOperator()) {
      this.calculator.setPrev(nextNum);
    } else {
      this.calculator.setCur(nextNum);
    }
    return nextNum;
  };

  this.updateOperator = (operator) => {
    if (operator == "=") {
      alert("=");
      return this.updateResult();
    }
    this.calculator.setOperator(operator);

    return this.calculator.getOperator();
  };

  this.updateResult = () => {
    let result = this.calculator.cal();
    $result.textContent = result;
    return $result.value;
  };

  this.onclickOperEventHandler = (event) => {
    const operator = event.target.textContent;
    this.updateOperator(operator);
  };

  this.onclickDigitEventHandler = (event) => {
    const inputnum = event.target.textContent;
    this.updateNumber(inputnum);
  };

  this.oonclickModifierEventHandler = (event) => {
    const modifier = event.target.textContent;
    if (modifier == "AC") {
      this.calculator.setPrev();
      this.calculator.setOperator();
      this.calculator.setCur();
      $result.textContent = 0;
    }
  };

  $digits.addEventListener("click", this.onclickDigitEventHandler);
  $operations.addEventListener("click", this.onclickOperEventHandler);
  $modifiers.addEventListener("click", this.oonclickModifierEventHandler);
}
