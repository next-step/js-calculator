import { $ } from "./utils/utils.js";

const $total = $("#total");
const $digits = $(".digits");

const $operations = $(".operations");

let num1 = "0";
let op = "";
let num2 = "";

const doAdd = () => {
  num1 = String(Number(num1) + Number(num2));
  num2 = "";
  op = "";
  $total.innerText = num1;
};

const OPERATION = {
  "+": doAdd,
};

const digitClick = ({ target }) => {
  const val = $total.innerText;
  const digit = target.innerText;
  if (val == "0") $total.innerText = "";
  $total.innerText += digit;
  if (op == "") {
    num1 += digit;
    return;
  }
  num2 += digit;
};

const opClick = ({ target }) => {
  if (target.innerText == "=") return calc();
  const val = $total.innerText;
  console.log(val);
  if (val.charAt(val.length - 1) < "0" || "9" < val.charAt(val.length - 1)) {
    $total.innerText = val.slice(0, -1) + target.innerText;
    op = target.innerText;
    return;
  }
  if (op != "") calc();
  $total.innerText += target.innerText;
  op = target.innerText;
};

const calc = () => {
  for (const input in OPERATION) {
    if (op == input) return OPERATION[input]();
  }
};

const alertNumFirst = () => {
  alert("숫자를 먼저 입력하신후 연산자를 입력하세요.");
};

//
// function is

$digits.addEventListener("click", digitClick);
$operations.addEventListener("click", opClick);
