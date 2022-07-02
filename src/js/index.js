import { Calculator } from "./calculator.js";
import { isButtonElement } from "./utils/validators.js";

const app = document.body.querySelector("#app");
const calculator = new Calculator(app);

app.addEventListener("click", (e) => {
  const target = e.target;
  if (isButtonElement(target) && target.classList.contains("digit")) {
    try {
      const digit = target.innerText;
      if (calculator.state.operator !== undefined) {
        calculator.setFirstTerm(digit);
      } else {
        calculator.setSecondTerm(digit);
      }
    } catch (e) {
      window.alert(e.message);
    }
  } else {
    return;
  }
});
