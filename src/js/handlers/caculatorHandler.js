import { SELECTORS, ERROR_MESSAGES, CLASS_NAMES } from "../utils/constants.js";
import { $ } from "../utils/dom.js";
import operator from "../utils/operator.js";

const operators = ["+", "X", "-", "/"];
const seperator = /(?=[+X/-])|(?<=[+X/-])/g;

const getHistory = () => {
  const expression = $(SELECTORS.RESULT);
  const prevResult = parseExpression(expression.innerText);
  const lastValue = prevResult[prevResult.length - 1];
  return { expression, prevResult, lastValue };
};

const parseExpression = (expression) =>
  expression.split(seperator).map((value) => {
    if (isNaN(+value)) return value;
    return +value;
  });

const digitHanlder = (target) => {
  const { expression, prevResult, lastValue } = getHistory();
  if (lastValue > 100) return alert(ERROR_MESSAGES.DIGIT_OVER_ERROR);
  const input = target.innerText;
  if (prevResult.length === 1 && prevResult[0] === 0) {
    expression.innerText = input;
  } else {
    expression.innerText += input;
  }
};

const operatorHanlder = (target) => {
  const { expression, prevResult, lastValue } = getHistory();
  if (expression.length === 1 || operators.indexOf(lastValue) !== -1)
    return alert(ERROR_MESSAGES.OPERATOR_OVER_ERROR);
  if (lastValue >= 1000) return alert(ERROR_MESSAGES.DIGIT_OVER_ERROR);
  if (target.innerText === "=") {
    const operationResult = operator(prevResult);
    expression.innerText = operationResult;
    return;
  }
  const input = target.innerText;
  expression.innerText += input;
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
