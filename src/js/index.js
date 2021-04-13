import "../css/index.css";
import calculator from "./calculator.js";
import { addEvent } from "./utils.js";

const $total = document.querySelector("#total");

window.addEventListener("DOMContentLoaded", () => {
  const $calculator = document.querySelector(".calculator");
  const $AC = document.querySelector(".modifiers");
  addEvent($calculator, "click", ".digit", handlerOfCalculatorClick);
  addEvent($calculator, "click", ".operation", handlerOfCalculatorClick);
  addEvent($AC, "click", ".modifier", handlerOfCalculatorClick);
});

const handlerOfCalculatorClick = ({ target }) => {
  const clicked = target.innerText;
  if (clicked === "=") {
    const result = calculate();
    $total.innerHTML = result;
    return;
  }
  if (clicked === "AC") {
    $total.innerHTML = "0";
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
  $total.innerHTML =
    $total.innerHTML === "0" ? target : $total.innerHTML + target;
};
