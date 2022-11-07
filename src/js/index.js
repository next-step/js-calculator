import Calculator from "./Calculator.js";

class App {
  constructor() {
    this.render();
  }

  render() {
    const $root = document.querySelector("#app");

    new Calculator({
      $root,
    });
  }
}

new App();
