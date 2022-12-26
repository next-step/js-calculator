import { setCurrentNumber, getCurrentNumber, popHistoryStack, assignHistory, initHistoryStack } from "../store/calculatorStore";

import { operationViews } from "../views/operationViews";
import { totalView } from "../views/totalView.js";

// TODO: operation만을 지속적으로 누를 경우의 이슈 해결

operationViews.forEach((operationView) => {
  if (operationView.rootElement.id === 'result') {
    operationView.onClick(() => {
      const { tempSavedNumber, currentNumber, tempSavedOperator } = popHistoryStack();

      initHistoryStack();
      const newCurrentNumber = calcNumbers(currentNumber, tempSavedOperator, tempSavedNumber);
      totalView.appendTextContent(setCurrentNumber(newCurrentNumber));
    });
    return;
  }

  operationView.onClick((e) => {
    const operation = e.target.textContent;

    const { tempNumber, tempOperator } = popHistoryStack();
    if (!tempOperator) {
      assignHistory({ tempNumber: currentNumber, tempOperator: operation });

      settimeout(() => totalView.appendTextContent(getCurrentNumber()), 200);
      totalView.appendTextContent('');
      return;
    }

    const newCurrentNumber = calcNumbers(getCurrentNumber(), tempOperator, tempNumber);
    assignHistory({ tempNumber: currentNumber, tempOperator: operation });

    setCurrentNumber(newCurrentNumber);
    totalView.appendTextContent(getCurrentNumber());
  });
});

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
