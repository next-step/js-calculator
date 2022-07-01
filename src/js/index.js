import { Model } from "./model.js";
import { Total } from "./components/total.js";
import { operators } from "./operators.js";
class App {
  model;
  total;

  constructor(appElement) {
    this.model = new Model();
    this.total = new Total(appElement.querySelector("#total"));
  }
}

new App(document.querySelector("#app"));
