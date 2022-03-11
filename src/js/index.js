import Calculator from "./Calculator.js";

new Calculator({
  $total: document.querySelector("#total"),
  $digits: document.querySelector(".digits"),
  $modifiers: document.querySelector(".modifiers"),
  $operations: document.querySelector(".operations"),
});
