import {
  duplicationOperator,
  maxLength,
  plus,
  minus,
  division,
  multiplication,
} from "./utils/define.js";

const numberBtn = document.getElementById("number");
const totalCount = document.getElementById("total");
const clearBtn = document.getElementById("clear");
const operatorBtn = document.getElementById("operator");

const totalCountToArr = () => totalCount.innerHTML.split("");
const valueList = (operator) => totalCount.innerHTML.split(operator);
const isOperator = (value) => isNaN(Number(value));
const curOperator = () => totalCountToArr().find(isOperator);

const isLessThanMaxValue = () => {
  const MAX_VALUE = 1000;
  const curCount = totalCount.innerHTML;
  if (curOperator()) {
    const [_, second] = valueList(curOperator());
    return Number(second) < MAX_VALUE;
  }

  return Number(curCount) < MAX_VALUE;
};

const addNumber = (cur) => {
  const isFirstClick = totalCountToArr()[0] === "0";
  if (isFirstClick) {
    totalCount.innerHTML = "";
  }

  totalCount.appendChild(document.createTextNode(cur));

  const isErr = !isLessThanMaxValue() && !isOperator(cur);
  if (isErr) {
    onErrHandler(maxLength);
    totalCount.removeChild(totalCount.lastChild);
  }
};

const onErrHandler = (type) => {
  switch (type) {
    case duplicationOperator:
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      break;
    case maxLength:
      alert("숫자는 세 자리까지만 입력 가능합니다!");
      break;
    default:
      return;
  }
};

const sum = () => {
  const [first, second] = valueList(curOperator()).map(Number);
  switch (curOperator()) {
    case plus:
      return first + second;
    case minus:
      return first - second;
    case division:
      return first / second;
    case multiplication:
      return first * second;
  }
};

// EventListener
numberBtn.addEventListener("click", (e) => {
  const cur = e.target.firstChild.nodeValue;
  addNumber(cur);
});

clearBtn.addEventListener("click", (_) => {
  totalCount.innerHTML = "0";
});

operatorBtn.addEventListener("click", (e) => {
  const operator = e.target.firstChild.nodeValue;
  const isLastNodeIsNaN = isNaN(totalCount.innerHTML.split("").reverse()[0]);
  const isSum = e.target.firstChild.nodeValue === "=";

  if (isSum) {
    totalCount.innerHTML = sum() ?? totalCount.innerHTML;
  } else if (isLastNodeIsNaN) {
    onErrHandler(duplicationOperator);
  } else {
    addNumber(operator);
  }
});
