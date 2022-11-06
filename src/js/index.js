import Calculator from "./Calculator.js";

class App {
  constructor() {
    this.$root = document.querySelector("#app");
  }

  render() {
    const calculator = new Calculator({ $root: this.$root });
    calculator.render();
  }
}

const app = new App();
app.render();
