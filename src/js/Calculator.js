const OPERATOR = {
  PLUS: (left, right) => left + right,
  MINUS: (left, right) => left - right,
  DIVIDE: (left, right) => left / right,
  MULTIPLY: (left, right) => left * right,
};

class Calculator {
  constructor({ $total, $digits, $modifiers, $operations }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$modifiers = $modifiers;
    this.$operations = $operations;
    this.state = {};
    this.init();
  }

  init() {
    this.setInitState();

    this.onDigitClick();
    this.onModifierClick();
    this.onOperatorClick();
  }

  setInitState() {
    const initState = {
      total: 0,
      operator: "",
      leftOperand: null,
      rightOperand: null,
    };

    this.state = initState;
  }

  onDigitClick() {
    this.$digits.addEventListener("click", ({ target }) => {
      const digit = target.textContent;
    });
  }

  onModifierClick() {
    this.$modifiers.addEventListener("click", () => {});
  }

  onOperatorClick() {
    this.$operations.addEventListener("click", ({ target }) => {
      this.operator = target.dataset.operator.toUpperCase();
    });
  }
}

export default Calculator;
