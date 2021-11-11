import {
  getInputNumLen,
  isArithmeticOperator,
  canInputArithmeticOperator,
  calculate,
} from "./utils.js";
import { MathSymbol } from "./constants.js";
export default class Calculator {
  constructor($target) {
    this.$target = $target;
    this.$total = this.$target.querySelector("#total");
    this.state = { formula: "" };
    this.bindEvents();
    this.render();
  }

  initState() {
    this.setState({
      formula: "",
    });
  }

  bindEvents() {
    const onClick = (e) => {
      const $digitBtn = e.target.closest(".digit");
      if ($digitBtn) {
        this.inputDigit($digitBtn.innerText);
        return;
      }
      const $modifier = e.target.closest(".modifier");
      if ($modifier) {
        this.initState();
        return;
      }
      const $operation = e.target.closest(".operation");
      if ($operation) {
        this.inputOperator($operation.innerText);
      }
    };

    this.$target.addEventListener("click", (e) => onClick(e));
  }

  inputDigit(digit) {
    const MAX_DIGIT_LEN = 3;
    if (getInputNumLen(this.state.formula) >= MAX_DIGIT_LEN) {
      window.alert("Maximum length of number is 3!");
      return;
    }
    this.setState({ formula: this.state.formula + digit });
  }

  inputOperator(operator) {
    if (!canInputArithmeticOperator(this.state.formula)) {
      window.alert("Input number before operator!");
      return;
    }
    if (operator === MathSymbol.Equal) {
      const formula = calculate(this.state.formula);
      this.setState({ formula });
    }
    if (isArithmeticOperator(operator)) {
      this.setState({ formula: this.state.formula + operator });
      return;
    }
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  render() {
    if (this.state.formula === "") {
      this.$total.innerText = 0;
      return;
    }
    this.$total.innerText = this.state.formula;
  }
}
