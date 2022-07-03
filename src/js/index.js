import { Calculator } from "./calculator.js";
import { alertOnError } from "./utils/alert.js";
import { isButtonElement } from "./utils/validators.js";

const app = document.body.querySelector("#app");
const calculator = new Calculator(app);

const digitEventHandler = (e) => {
  const target = e.target;
  if (isButtonElement(target) && target.classList.contains("digit")) {
    const digit = target.innerText;
    if (calculator.state.operation === undefined) {
      calculator.setFirstTerm(digit);
    } else {
      calculator.setSecondTerm(digit);
    }
  } else {
    return;
  }
};

const operationEventHandler = (e) => {
  const target = e.target;
  if (isButtonElement(target) && target.classList.contains("operation")) {
    const operation = target.innerText;
    calculator.setOperation(operation);
  } else {
    return;
  }
};

const modifierEventHandler = (e) => {
  const target = e.target;
  if (isButtonElement(target) && target.classList.contains("modifier")) {
    calculator.clear();
  } else {
    return;
  }
};

app.addEventListener("click", modifierEventHandler);
app.addEventListener("click", (e) => alertOnError(operationEventHandler, e));
app.addEventListener("click", (e) => alertOnError(digitEventHandler, e));
