import { $digits, $modifier, $operations, $equal } from "./view.js";
import { inputNumber, clearNumber, inputOperator, setResult } from "./caculator.js";

function init() {
  $digits.addEventListener("click", inputNumber);

  $modifier.addEventListener("click", clearNumber);

  $operations.addEventListener("click", inputOperator);

  $equal.addEventListener("click", setResult);
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});
