import Calculator from "./Calculator.js";
import CalculatorView from "./CalculatorView.js";

export default function App($target) {
  const calculatorDiv = $target.querySelector(".calculator");
  this.calculator = new Calculator();
  this.CalculatorView = new CalculatorView(this.calculator, calculatorDiv);
}
