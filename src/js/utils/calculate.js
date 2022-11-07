import { checkCorrectOrder } from './validate.js';

export const getTotal = ({ operation, total }) => {
  const [firstNum, secondNum] = total.split(operation);

  let newTotal = '';
  switch (operation) {
    case '+':
      newTotal = +firstNum + +secondNum;
      break;
    case '-':
      newTotal = +firstNum - +secondNum;
      break;
    case 'X':
      newTotal = +firstNum * +secondNum;
      break;
    case '/':
      newTotal = +firstNum / +secondNum;
      break;
  }
  return {
    total: `${Math.floor(newTotal)}`,
    digitCount: total.length,
  };
};

export const operationOnclick = ({ state, newValue }) => {
  const { total, operation } = state;

  if (!checkCorrectOrder(total)) {
    return;
  }
  let newState = {};

  switch (newValue) {
    case '=':
      newState = getTotal({
        operation,
        total,
      });
      break;
    default:
      newState = {
        total: `${total}${newValue}`,
        digitCount: 0,
        operation: newValue,
      };
      break;
  }
  return newState;
};
