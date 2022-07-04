import { Calculator } from "./calculator.js";
import { alertOnError } from "./utils/alert.js";
import { isButtonHasClassName } from "./utils/validators.js";

const app = document.body.querySelector("#app");
const calculator = new Calculator(app);

const digitEventHandler = (e) => {
  const target = e.target;
  if (!isButtonHasClassName("digit")) return;
  const digit = target.innerText;
  if (calculator.state.operation === undefined) {
    calculator.setFirstTerm(digit);
  } else {
    calculator.setSecondTerm(digit);
  }
};

const operationEventHandler = (e) => {
  const target = e.target;
  if (isButtonHasClassName("operation")) return;
  const operation = target.innerText;
  calculator.setOperation(operation);
};

const modifierEventHandler = (e) => {
  const target = e.target;
  if (!isButtonHasClassName("modifier")) return;
  calculator.clear();
};

app.addEventListener("click", modifierEventHandler);
app.addEventListener("click", (e) => alertOnError(operationEventHandler, e));
app.addEventListener("click", (e) => alertOnError(digitEventHandler, e));
