import { $ } from "./utils/dom.js";
import { SELECTORS } from "./utils/constants.js";

class App {
  constructor() {
    this.target = $(SELECTORS.APP);
    this.bindEvents();
  }

  bindEvents() {
    this.target.addEventListener("click", ({ target }) => {});
  }
}

new App();
