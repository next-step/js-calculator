import { $ } from "./utils/utils.js";

const $total = $("#total");
const $digits = $(".digits");
const $operations = $(".operations");
const $modifier = $(".modifier");

let num1 = "0";
let op = "";
let num2 = "";

function afterCalc() {
  num2 = "";
  op = "";
  $total.innerText = num1;
}

const doAdd = () => {
  num1 = String(Number(num1) + Number(num2));
  afterCalc();
};

const doMinus = () => {
  num1 = String(Number(num1) - Number(num2));
  afterCalc();
};

const doDiv = () => {
  num1 = String(Math.floor(Number(num1) / Number(num2)));
  afterCalc();
};

const doMul = () => {
  num1 = String(Number(num1) * Number(num2));
  afterCalc();
};
const OPERATION = {
  "+": doAdd,
  "-": doMinus,
  "/": doDiv,
  X: doMul,
};

const digitClick = ({ target }) => {
  const val = $total.innerText;
  const digit = target.innerText;
  if (val == "0") $total.innerText = "";

  if (op == "") {
    if (Number(num1 + digit) >= 1000 || Number(num1 + digit) <= -1000)
      return alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
    num1 += digit;
    $total.innerText += digit;
    return;
  }
  if (Number(num2 + digit) >= 1000 || Number(num2 + digit) <= -1000)
    return alert("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
  num2 += digit;
  $total.innerText += digit;
};

const opClick = ({ target }) => {
  if (target.innerText == "=") return calc();
  const val = $total.innerText;
  if (val.charAt(val.length - 1) < "0" || "9" < val.charAt(val.length - 1)) {
    $total.innerText = val.slice(0, -1) + target.innerText;
    op = target.innerText;
    return;
  }
  if (op != "") calc();
  $total.innerText += target.innerText;
  op = target.innerText;
};

const acClick = ({ target }) => {
  if (target.innerText == "AC") {
    num1 = "0";
    afterCalc();
  }
};

const calc = () => {
  for (const input in OPERATION) {
    if (op == input) return OPERATION[input]();
  }
};

const alertNumFirst = () => {
  alert("숫자를 먼저 입력하신후 연산자를 입력하세요.");
};

$digits.addEventListener("click", digitClick);
$operations.addEventListener("click", opClick);
$modifier.addEventListener("click", acClick);
