import "../css/index.css";
import calculator from "./calculator.js";
window.addEventListener("DOMContentLoaded", () => {
  const $calculator = document.querySelector(".calculator");
  $calculator.addEventListener("click", handlerOfCalculatorClick);
});

const handlerOfCalculatorClick = ({ target }) => {
  const num = target.innerText;
};
