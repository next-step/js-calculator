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

  return (
    HANDLER_BY_TYPE[type] ||
    (() => {
      throw new Error("해당하는 타입에 대한 정의가 존재하지 않습니다.");
    })
  );
};

const handler = (e) => {
  e.stopPropagation();
  const { className: targetType, innerText: targetValue } = e.target;

  onHandledClick(targetType, targetValue)();
};

$calculator.addEventListener("click", handler);
