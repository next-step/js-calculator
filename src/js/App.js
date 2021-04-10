export default function App() {
  const dom = document.querySelector("#app");
  const total = dom.querySelector("#total");
  const digits = dom.querySelector(".digits");

  const init = () => {
    digits.addEventListener("click", onClickDigit);
  };

  const onClickDigit = ({ target }) => {
    total.innerText = target.innerText;
  };

  init();
}
