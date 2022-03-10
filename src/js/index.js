import { inputNumber } from "./calculator/inputNumber.js";
import { inputOperator } from "./calculator/inputOperator.js";
import { clearOperation } from "./calculator/clearOperation.js";
import { calculateOperation } from "./calculator/calculateOperation.js";

const numberBtn = document.querySelector(".digits");
const operatorBtn = document.querySelector(".operations");
const allClearBtn = document.querySelector(".modifiers");
const equalSign = document.querySelector("#equalSign");

numberBtn.addEventListener("click", inputNumber);
operatorBtn.addEventListener("click", inputOperator);
allClearBtn.addEventListener("click", clearOperation);
equalSign.addEventListener("click", calculateOperation);
