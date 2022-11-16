import Ui from "./ui.js";

const total = document.querySelector("#total");

const ui = new Ui(total);

const $calculator = document.querySelector(".calculator");

const onHandledClick = (type, value) => {
  const HANDLER_BY_TYPE = {
    digit: () => ui.onClickDigit(value),
    operation: () => ui.onClickOperator(value),
    modifier: () => ui.initialize(),
  };

  HANDLER_BY_TYPE[type]();
};

const handler = (e) => {
  e.stopPropagation();
  const { className: targetType, innerText: targetValue } = e.target;

  onHandledClick(targetType, targetValue);
};

$calculator.addEventListener("click", handler);
