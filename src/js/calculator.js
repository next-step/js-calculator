//initialState
const initialState = {
  totalValue: 0,
  prevValue: null,
  currentValue: null,
  operation: null,
};

class Calculator {
  constructor({ $total, $digits, $operations, $modifier }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$operations = $operations;
    this.$modifier = $modifier;
    this.state = { ...initialState };
  }

  init() {
    this.$digits.addEventListener("click", this.onDigitClick.bind(this));
    this.$operations.addEventListener(
      "click",
      this.onOperationClick.bind(this)
    );
    this.$modifier.addEventListener("click", this.onModifierClick.bind(this));
  }

  onDigitClick({ target }) {
    const input = Number(target.dataset.digit); //숫자패드에서 받아오는 입력값
    let currentValue =
      this.state.currentValue === 0
        ? input
        : this.state.currentValue * 10 + input;

    //값이 3자릿수를 넘어가면, 일의자릿수를 입력값으로 바꿔준다.
    if (currentValue >= 1000)
      currentValue = Math.floor(currentValue / 100) * 10 + input;

    this.state.currentValue = currentValue;
    this.render(currentValue);
  }

  onOperationClick({ target }) {
    const input = target.dataset.operation;
    if (input === "=") {
      let total = null;
      switch (this.state.operation) {
        case "+":
          total = this.state.prevValue + this.state.currentValue;
          this.state.totalValue = total;
          this.state.prevValue = total;
          this.state.currentValue = null;
          this.state.operation = null;
          return this.render(this.state.totalValue);

        case "-":
          total = this.state.prevValue - this.state.currentValue;
          this.state.totalValue = total;
          this.state.prevValue = total;
          this.state.currentValue = null;
          this.state.operation = null;
          return this.render(this.state.totalValue);

        case "/":
          total = Math.floor(this.state.prevValue / this.state.currentValue);
          this.state.totalValue = total;
          this.state.prevValue = total;
          this.state.currentValue = null;
          this.state.operation = null;
          return this.render(this.state.totalValue);

        case "X":
          total = this.state.prevValue * this.state.currentValue;
          this.state.totalValue = total;
          this.state.prevValue = total;
          this.state.currentValue = null;
          this.state.operation = null;
          return this.render(this.state.totalValue);

        default:
          this.state.totalValue = this.state.totalValue;
      }
    }

    // 연산을 연달아서 하는 경우
    if (this.state.operation !== null) {
      let value = null;
      switch (this.state.operation) {
        case "+":
          value = this.state.prevValue + this.state.currentValue;
          this.state.prevValue = value;
          this.state.currentValue = 0;
          this.state.operation = input;
          return this.render(this.state.prevValue);
        case "-":
          value = this.state.prevValue - this.state.currentValue;
          this.state.prevValue = value;
          this.state.currentValue = 0;
          this.state.operation = input;
          return this.render(this.state.prevValue);

        case "/":
          value = Math.floor(this.state.prevValue / this.state.currentValue);
          this.state.prevValue = value;
          this.state.currentValue = 0;
          this.state.operation = input;
          return this.render(this.state.prevValue);

        case "X":
          value = this.state.prevValue * this.state.currentValue;
          this.state.prevValue = value;
          this.state.currentValue = 0;
          this.state.operation = input;
          return this.render(this.state.prevValue);

        default:
          this.state.totalValue = this.state.totalValue;
      }
    }
    if (this.state.currentValue > 0) {
      this.state.prevValue = this.state.currentValue;
      this.state.currentValue = 0;
    }

    this.state.operation = input;
  }

  onModifierClick() {
    this.state.totalValue = 0;
    this.state.prevValue = null;
    this.state.currentValue = null;
    this.state.operation = null;
    this.render(this.state.totalValue);
  }

  render(value) {
    this.$total.textContent = value;
  }
}

export default Calculator;
