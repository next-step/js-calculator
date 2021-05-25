export default class Calculator {
  $target;
  $total;
  constructor($target) {
    this.$target = $target;
    this.$total = this.$target.querySelector("#total");
    this.state = { n1: null, n2: null, op: null, result: 0 };
    this.bindEvents();
    this.render();
  }

  initState() {
    this.setState({
      n1: null,
      n2: null,
      op: null,
      result: 0,
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
    if (this.state.op) {
      this.setState({
        n2: +`${this.state.n2 ?? ""}${digit}`.substr(0, MAX_DIGIT_LEN),
      });
    } else {
      this.setState({
        n1: +`${this.state.n1 ?? ""}${digit}`.substr(0, MAX_DIGIT_LEN),
      });
    }
  }

  inputOperator(operator) {
    switch (operator) {
      case "/":
      case "X":
      case "+":
      case "-":
        this.setState({ op: operator });
        break;
      case "=":
        const result = this.calculate(
          this.state.n1,
          this.state.n2,
          this.state.op
        );
        this.setState({ n1: null, n2: null, op: null, result });
    }
  }

  calculate(n1, n2, op) {
    switch (op) {
      case "/":
        return Math.floor(n1 / n2);
      case "X":
        return n1 * n2;
      case "+":
        return n1 + n2;
      case "-":
        return n1 - n2;
    }
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  render() {
    console.log({ ...this.state });
    if (typeof this.state.n2 === "number") {
      this.$total.innerText = this.state.n2;
      return;
    }
    if (typeof this.state.n1 === "number") {
      this.$total.innerText = this.state.n1;
      return;
    }
    if (typeof this.state.result === "number") {
      this.$total.innerText = this.state.result;
      return;
    }
    this.$total.innerText = 0;
  }
}
