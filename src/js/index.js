import { handleCalClicked } from "./handlers/handleCalClicked.js";
import { $ } from "./utils/DOM.js";

const calculator = () => {
  const $calculator = $(".calculator");

  $calculator.addEventListener("click", handleCalClicked);
};

window.addEventListener("DOMContentLoaded", () => {
  calculator();
});
