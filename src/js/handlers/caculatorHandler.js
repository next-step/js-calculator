import { SELECTORS, ERROR_MESSAGES, CLASS_NAMES } from "../utils/constants.js";
import operator from "../utils/operator.js";
import { $ } from "../utils/dom.js";

const operators = ["+", "X", "-", "/"];
const seperator = /(?=[+X/-])|(?<=[+X/-])/g;

const parseExpression = (expression) =>
  expression.split(seperator).map((value) => {
    if (isNaN(+value)) return value;
    return +value;
  });

const digitHanlder = (target) => {
  const result = $(SELECTORS.RESULT);
  const prevResult = parseExpression(result.innerText);
  const lastValue = prevResult[prevResult.length - 1];
  if (lastValue > 100) return alert(ERROR_MESSAGES.DIGIT_OVER_ERROR);
  const input = target.innerText;
  if (prevResult.length === 1 && prevResult[0] === 0) {
    result.innerText = input;
  } else {
    result.innerText += input;
  }
};

const operatorHanlder = (target) => {
  const result = $(SELECTORS.RESULT);
  const prevResult = parseExpression(result.innerText);
  const lastValue = prevResult[prevResult.length - 1];
  if (lastValue === 0 || operators.indexOf(lastValue) !== -1)
    return alert(ERROR_MESSAGES.OPERATOR_OVER_ERROR);
  if (target.innerText === "=") {
    const operationResult = operator(prevResult);
    result.innerText = operationResult;
    return;
  }
  const input = target.innerText;
  result.innerText += input;
};

const modifierHandler = () => {
  $(SELECTORS.RESULT).innerText = "0";
};

const calculatorHandler = ({ target }) => {
  const { className } = target;
  const assingAction = {
    [CLASS_NAMES.DIGIT]: () => digitHanlder(target),
    [CLASS_NAMES.MODIFIER]: () => modifierHandler(),
    [CLASS_NAMES.OPERATION]: () => operatorHanlder(target),
  };
  assingAction[className] && assingAction[className]();
};

export default calculatorHandler;
