import {
  operationValidationCheck,
  digitValidationCheck,
  arithmeticExpression,
  setEnterTextInTotal,
} from './function/arithmetic.js';

export const onButtonClick = (event) => {
  const buttonText = event.target.innerText;

  const isCompleted = isNaN(buttonText)
    ? operationValidationCheck(buttonText)
    : digitValidationCheck(buttonText);

  if (!isCompleted) return;

  if (buttonText === '=') {
    arithmeticExpression();
    return;
  }

  setEnterTextInTotal(buttonText);
};

export const onModifierClick = () => {
  digitTextArray.length = 0;
  operationTextArray.length = 0;
  digitGroup = '';
  total.innerText = 0;
};
