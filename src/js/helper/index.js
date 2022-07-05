import { displayText } from '../utils/index.js';
import { ERROR_MESSAGE, INIT_DISPLAY_TEXT, OPERATIONS } from '../constants/index.js';
import { validateDigit, validateOperation } from '../validations/index.js';

// View 관련 로직

// 일반 로직
export const handleDigitClick = (e) => {
  const clickedNumber = e.target.innerText;
  const errorMessage = validateDigit(displayText.innerText);

  if (errorMessage !== ERROR_MESSAGE.NO_ERROR) {
    alert(errorMessage);
    return
  };
  
  if (displayText.innerText === INIT_DISPLAY_TEXT) {
    displayText.innerText = clickedNumber;
    return
  };

  displayText.innerText += clickedNumber;
}

export const handleOperationClick = (e) => {
  const clickedOperation = e.target.innerText;
  const operations = displayText.innerText.split('').filter(isNaN);
  const lastText = displayText.innerText.slice(-1);
  const operationsValue = Object.values(OPERATIONS);
  const [operation] = operations;
  const errorMessage = validateOperation(clickedOperation, operations, lastText, operationsValue);

  if (errorMessage !== ERROR_MESSAGE.NO_ERROR) {
    alert(errorMessage);
    return
  };
  
  if (clickedOperation === OPERATIONS.EQUAL) {
    const calculatedNumbers = displayText.innerText.split(operation);
    const [firstNumber, secondNumber] = calculatedNumbers;

    if (operation === OPERATIONS.ADD) {
     const result = Number(firstNumber) + Number(secondNumber);
     displayText.innerText = result;
     return
    };

    if (operation === OPERATIONS.MINUS) {
      const result = Number(firstNumber) - Number(secondNumber);
      displayText.innerText = result;
      return
    };

    if (operation === OPERATIONS.MULTIPLE) {
      const result = Number(firstNumber) * Number(secondNumber);
      displayText.innerText = result;
      return
    };

    if (operation === OPERATIONS.DIVISION) {
      const result = Math.floor(Number(firstNumber) / Number(secondNumber));
      displayText.innerText = result;
      return
    };
  };
  displayText.innerText += clickedOperation;
}

export const handleModifierClick = () => {
  displayText.innerText = 0;
}