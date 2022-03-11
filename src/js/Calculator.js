class Calculator {
  constructor({ $total, $digits, $modifiers, $operations }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$modifiers = $modifiers;
    this.$operations = $operations;
    this.init();
  }

  init() {}
}

export default Calculator;
