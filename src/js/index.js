import { Selectors } from "./utils/constants.js";
import { $ } from "./utils/dom.js";
import { handleCalculator } from "./handlers/handleCalculator.js";

const calculator = () => {
  const $calculator = $(Selectors.CALC);
  $calculator.addEventListener("click", handleCalculator);
};

window.addEventListener("DOMContentLoaded", () => calculator());
