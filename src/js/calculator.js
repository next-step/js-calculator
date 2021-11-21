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

  bindEvents() {
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

  onEqualClick(value) {
    this.state.totalValue = value;
    this.state.prevValue = value;
    this.state.currentValue = null;
    this.state.operation = null;
    return this.render(value);
  }

  persistCalc(value, input) {
    this.state.prevValue = value;
    this.state.currentValue = null;
    this.state.operation = input;
    return this.render(value);
  }

  onOperationClick({ target }) {
    const input = target.dataset.operation; //input의 dataset 값
    let value = null;
    switch (this.state.operation) {
      case "+":
        value = this.state.prevValue + this.state.currentValue;
        if (input === "=") return this.onEqualClick(value);
        return this.persistCalc(value, input);
      case "-":
        value = this.state.prevValue - this.state.currentValue;
        if (input === "=") return this.onEqualClick(value);
        return this.persistCalc(value, input);

      case "/":
        value = Math.trunc(this.state.prevValue / this.state.currentValue);
        if (input === "=") return this.onEqualClick(value);
        return this.persistCalc(value, input);

      case "X":
        value = this.state.prevValue * this.state.currentValue;
        if (input === "=") return this.onEqualClick(value);
        return this.persistCalc(value, input);

      default:
        this.state.totalValue = this.state.totalValue;
    }

    if (this.state.currentValue > 0) {
      this.state.prevValue = this.state.currentValue;
      this.state.currentValue = 0;
    }
    this.state.operation = input;
  }

  onModifierClick() {
    this.state = { ...initialState };
    this.render(this.state.totalValue);
  }

  render(value) {
    this.$total.textContent = value;
  }
}

export default Calculator;
