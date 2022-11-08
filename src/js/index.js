import Calculator from "./calculator.js";

const total = document.querySelector("#total");
const calculator = new Calculator(total);
calculator.acAddEventListener();
calculator.digitAddEventListener();
calculator.operationAddEventListener();
