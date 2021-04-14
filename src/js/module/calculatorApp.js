import Value from "../component/value.js";
import CalculatorPad from "../component/view/calculatorPad.js";
import CalculatorResult from "../component/view/calculatorResult.js";

export default function CalculatorApp() {
  this.value = new Value();
  this.result = new CalculatorResult();
  this.pad = new CalculatorPad(this);

  this.setState = () => {
    this.result.render(this.value);
  }

  this.init = () => {
    this.setState();
  }

  this.operand = op => {
    this.value.concat(op);
    this.setState();
  }

  this.operator = op => {
    this.value.concat(op);
    this.setState();
  }
}