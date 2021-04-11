import Calculator from "./Calculator.js";

export default function App() {
  const calculator = Calculator();
  let flag = false;

  const dom = document.querySelector("#app");
  const total = dom.querySelector("#total");
  const digits = dom.querySelector(".digits");
  const reset = dom.querySelector(".modifier");
  const operators = dom.querySelector(".operations");

  const init = () => {
    digits.addEventListener("click", onClickDigit);
    reset.addEventListener("click", onClickReset);
    operators.addEventListener("click", onClickOperator);
  };

  const onClickDigit = ({ target }) => {
    const value = target.innerText;

    if (total.innerText === "0" || flag) {
      total.innerText = value;
      flag = false;
      return;
    }

    total.innerText += value;
  };

  const onClickReset = () => {
    total.innerText = 0;
  };

  const onClickOperator = ({ target }) => {
    flag = true;

    calculator.insertNumber(total.innerText);
    total.innerText = calculator.run();

    calculator.insertOperator(target.innerText);
  };

  init();
}
