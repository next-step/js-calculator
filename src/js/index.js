import { $ } from "./utils/dom.js";
import { SELECTORS } from "./utils/constants.js";
import calculatorHandler from "./handlers/caculatorHandler.js";

const app = () => {
  $(SELECTORS.CACULATOR).addEventListener("click", calculatorHandler);
};

window.addEventListener("DOMContentLoaded", app);
