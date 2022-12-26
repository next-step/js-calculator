import {
  setCurrentNumber,
  getCurrentNumber,
  popHistoryStack,
  assignHistory,
  initHistoryStack,
  setIsOperateState,
  isOperateState,
} from "../store/calculatorStore.js";

import { operationViews } from "../views/operationViews.js";
import { totalView } from "../views/totalView.js";

operationViews.forEach((operationView) => {
  if (operationView.rootElement.id === 'result') {
    operationView.onClick(() => {
      if (isOperateState) return blinkTotalView();
      setIsOperateState(true);

      const { tempSavedNumber, currentNumber, tempSavedOperator } = popHistoryStack();

      initHistoryStack();
      const newCurrentNumber = calcNumbers(currentNumber, tempSavedOperator, tempSavedNumber);
      totalView.appendTextContent(setCurrentNumber(newCurrentNumber));
    });
    return;
  }

  operationView.onClick((e) => {
    if (isOperateState) return blinkTotalView();
    setIsOperateState(true);

    const operation = e.target.textContent;

    const { tempNumber, tempOperator } = popHistoryStack();
    if (!tempOperator) {
      assignHistory({ tempNumber: currentNumber, tempOperator: operation });

      blinkTotalView();
      return;
    }

    const newCurrentNumber = calcNumbers(getCurrentNumber(), tempOperator, tempNumber);
    assignHistory({ tempNumber: currentNumber, tempOperator: operation });

    totalView.appendTextContent(setCurrentNumber(newCurrentNumber));
  });
});

function blinkTotalView() {
  settimeout(() => totalView.appendTextContent(getCurrentNumber()), 200);
  totalView.appendTextContent('');
}

function calcNumbers(number1, operation, number2) {
  switch(operation) {
    case('+'): {
      return number1 + number2;
    }
    case('-'): {
      return number1 - number2;
    }
    case('x'): {
      return number1 * number2;
    }
    case('/'): {
      return Math.round(number1 / number2);
    }
  }

  return number1;
}
