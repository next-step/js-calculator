import Calculator from "./calculator.js";

const calculator = new Calculator({
  $total: document.querySelector("#total"),
  $digits: document.querySelector(".js-digits"),
  $operations: document.querySelector(".js-operations"),
  $modifiers: document.querySelector(".js-modifiers"),
});

calculator.init();
