import Value from "../component/value.js";
import CalculatorPad from "../component/view/calculatorPad.js";
import CalculatorResult from "../component/view/calculatorResult.js";

export default function CalculatorApp() {
  this.value;
  this.result = new CalculatorResult();
  this.pad = new CalculatorPad(this);

  this.setState = () => {
    this.result.render(this.value);
  }

  this.init = () => {
    this.value = new Value();
    this.setState();
  }

  this.operand = op => {
    this.value.operand(op);
    this.setState();
  }

  this.operator = op => {
    this.value.operator(op);
    this.setState();
  }

  this.operate = () => {
    this.value.calculate();
    this.setState();
  }

  this.modify = () => {
    this.init();
  }
}