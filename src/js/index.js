import { handleCalClicked } from "./handlers/handleCalClicked";
import { $ } from "./utils/DOM";

const calculator = () => {
  const $calculator = $(".calculator");

  $calculator.addEventListener("click", handleCalClicked);
};

window.addEventListener("DOMContentLoaded", () => {
  calculator();
});
