import { SELECTORS, ERROR_MESSAGES, CLASS_NAMES } from "../utils/constants.js";
import { $ } from "../utils/dom.js";

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
  const input = target.innerText;
  const result = $(SELECTORS.RESULT);
  result.innerText += input;
};

const modifierHandler = (target) => {};

const calculatorHandler = ({ target }) => {
  const { className } = target;
  const assingAction = {
    [CLASS_NAMES.DIGIT]: () => digitHanlder(target),
    [CLASS_NAMES.MODIFIER]: () => modifierHandler(target),
    [CLASS_NAMES.OPERATION]: () => operatorHanlder(target),
  };
  assingAction[className] && assingAction[className]();
};

export default calculatorHandler;
