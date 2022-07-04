import { displayText } from '../utils/index.js';
import { INIT_DISPLAY_TEXT, OPERATIONS } from '../constants/index.js';
import { validateDigit, validateOperation } from '../validations/index.js';

export const handleDigitClick = (e) => {
  const clickedNumber = e.target.innerText;

  if (validateDigit()) return;
  
  if (displayText.innerText === INIT_DISPLAY_TEXT) {
    displayText.innerText = clickedNumber;
    return
  };

  displayText.innerText += clickedNumber;
}

export const handleOperationClick = (e) => {
  const clickedOperation = e.target.innerText;
  const operations = displayText.innerText.split('').filter((text) => isNaN(text));
  const [operation] = operations;

  if (validateOperation(clickedOperation, operations)) return;
  
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