import { inputNumber } from "./calculator/inputNumber.js";
import { inputOperator } from "./calculator/inputOperator.js";
import { clearOperation } from "./calculator/clearOperation.js";

const numberBtn = document.querySelector(".digits");
const operatorBtn = document.querySelector(".operations");
const allClearBtn = document.querySelector(".modifiers");

numberBtn.addEventListener("click", inputNumber);
operatorBtn.addEventListener("click", inputOperator);
allClearBtn.addEventListener("click", clearOperation);
