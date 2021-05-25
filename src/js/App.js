import Calculator from "./Calculator.js";

const INITIAL_NUMBER = 0;
const MAX_NUMBER_LENGTH = 3;

export default function App() {
  const calculator = Calculator();
  let isFirstNumber = true;

  const dom = document.querySelector("#app");
  const total = dom.querySelector("#total");
  const digits = dom.querySelector(".digits");
  const reset = dom.querySelector(".modifier");
  const operators = dom.querySelector(".operations");

  const initEventListener = () => {
    digits.addEventListener("click", onClickDigit);
    reset.addEventListener("click", onClickReset);
    operators.addEventListener("click", onClickOperator);
  };

  const onClickDigit = ({ target }) => {
    const value = target.innerText;

    if (isFirstNumber) {
      total.innerText = value;
      isFirstNumber = false;
      return;
    }

    if (total.innerText.length < MAX_NUMBER_LENGTH) {
      total.innerText += value;
    }
  };

  const onClickReset = () => {
    total.innerText = INITIAL_NUMBER;
  };

  const onClickOperator = ({ target }) => {
    isFirstNumber = true;

    calculator.setNumber(total.innerText);
    total.innerText = calculator.run();

    calculator.setOperator(target.innerText);
  };

  initEventListener();
}
