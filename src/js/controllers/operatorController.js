import {
  setCurrentNumber,
  getCurrentNumber,
  popHistoryStack,
  assignHistory,
  initHistoryStack,
  initCurrentNumber,
  setIsOperateState,
  isOperateState,
} from "../store/calculatorStore.js";

import { operationViews } from "../views/operationViews.js";
import { totalView } from "../views/totalView.js";

operationViews.forEach((operationView) => {
  operationView.onClick((e) => {
    if (isOperateState) return blinkTotalView();
    setIsOperateState(true);

    const operation = e.target.textContent;
    const { tempNumber, tempOperator } = popHistoryStack();
    const currentNumber = getCurrentNumber();

    if (!tempOperator) {
      assignHistory({ tempNumber: currentNumber, tempOperator: operation });
      blinkTotalView(currentNumber);

      initCurrentNumberAndHistory();
      return;
    }

    const newCurrentNumber = calcNumbers(currentNumber, tempOperator, tempNumber);
    assignHistory({ tempNumber: newCurrentNumber, tempOperator: operation });
    totalView.appendTextContent(setCurrentNumber(newCurrentNumber));

    initCurrentNumberAndHistory()
  });
});

function initCurrentNumberAndHistory(operation) {
  initCurrentNumber();
  isEqualOperation(operation) && initHistoryStack();

  function isEqualOperation(operation) {
    return operation === '=';
  }
}

function blinkTotalView(currentNumber) {
  setTimeout(() => totalView.appendTextContent(currentNumber), 100);
  totalView.appendTextContent('');
}

function calcNumbers(number1, operation, number2) {
  switch(operation) {
    case('+'): {
      return number2 + number1;
    }
    case('-'): {
      return number2 - number1;
    }
    case('x'): {
      return number2 * number1;
    }
    case('/'): {
      return Math.round(number2 / number1);
    }
  }

  return number1;
}
