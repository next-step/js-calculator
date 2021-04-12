import "../css/index.css";
import calculator from "./calculator.js";
import { addEvent } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  const $calculator = document.querySelector(".calculator");
  addEvent($calculator, "click", ".digit", handlerOfCalculatorClick);

  addEvent($calculator, "click", ".operation", handlerOfCalculatorClick);
});

const handlerOfCalculatorClick = ({ target }) => {
  const clicked = target.innerText;
  if (clicked === "=") {
    const result = calculate();
    const $total = document.querySelector("#total");

    $total.innerHTML = result;
    return;
  }
  insertTargetInTotal(clicked);
};
const calculate = () => {
  const total = document.querySelector("#total").innerHTML;
  const [left, type, right] = total.match(/(?:\d+|[+-X\/])/g);
  return calculator(type, left, right);
};
const insertTargetInTotal = (target) => {
  const $total = document.querySelector("#total");
  $total.innerHTML =
    $total.innerHTML === "0" ? target : $total.innerHTML + target;
};
