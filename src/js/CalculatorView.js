import ERROR_MESSAGE from "../const/ERROR_MESSAGE";
import Calculator from "./Calculaotr";

export default function CalculatorView(calculator, $target) {
  if (!(calculator instanceof Calculator)) {
    throw new Error();
  }
  this.calculator = calculator;

  const $result = document.createElement("div");
  const $num1 = document.createElement("input");
  const $num2 = document.createElement("input");
  const calBtn = document.createElement("button");
  const plusBtn = document.createElement("button");
  const minusBtn = document.createElement("button");
  const multiBtn = document.createElement("button");
  const divideiBtn = document.createElement("button");

  this.isValidInput = (numstr) => {
    if (numstr.length > 3) throw new Error(ERROR_MESSAGE.WRONG_NUMINPUT);
    if (numstr === null || numstr === "undefined" || numstr === "")
      throw new Error(ERROR_MESSAGE.WRONG_NUMINPUT);
    return true;
  };

  this.updateNumber = (inputnum) => {
    let numstr = String(inputnum); // new String x
    let num = Number(inputnum);

    if (this.isValidInput(numstr)) {
      if (!this.calculator.getPrev()) {
        this.calculator.setPrev(num);
      } else if (!this.calculator.getCur()) {
        this.calculator.setCur(num);
      }
      return num;
    }
  };

  this.updateOperator = (operator) => {
    this.calculator.setOperator(operator);
    return this.calculator.getOperator();
  };
  this.updateResult = () => {
    let result = this.calculator.cal();
    $result.value = result;
    return $result.value;
  };

  this.oninputEventHandler = (event) => {
    const inputnum = event.target.textContent;
    this.updateNumber(inputnum);
  };

  this.onclickOperEventHandler = (event) => {
    const operator = event.target.textContent;
    this.updateNumber(operator);
  };

  $num1.addEventListener("input", this.oninputEventHandler);
  $num2.addEventListener("input", this.oninputEventHandler);
  plusBtn.addEventListener("click", this.onclickOperEventHandler);

  calBtn.addEventListener("click", () => {
    this.updateResult();
  });
}
