import Calculator from "./Calculator.js";

class App {
  constructor() {
    this.$root = document.querySelector("#app");
  }

  render() {
    new Calculator({
      $root: this.$root,
    });
  }
}

const app = new App();
app.render();
