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
    this.total = 0;
    this.operator = "";
    this.leftOperand = null;
    this.rightOperand = null;
    this.init();
  }

  init() {
    this.onDigitClick();
    this.onModifierClick();
    this.onOperatorClick();
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
