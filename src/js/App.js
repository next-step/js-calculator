export default function App() {
  const dom = document.querySelector("#app");
  const total = dom.querySelector("#total");
  const digits = dom.querySelector(".digits");
  const reset = dom.querySelector(".modifier");

  const init = () => {
    digits.addEventListener("click", onClickDigit);
    reset.addEventListener("click", onClickReset);
  };

  const onClickDigit = ({ target }) => {
    const value = target.innerText;

    if (total.innerText === "0") {
      total.innerText = value;
      return;
    }

    total.innerText += value;
  };

  const onClickReset = () => {
    total.innerText = 0;
  };

  init();
}
