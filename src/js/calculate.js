import { LENGTH_LIMIT_OPERATOR } from './constants.js';
import checkNotNumber from './regex.js';

const handleCalculate = (beforeNumber, operator, afterNumber) => {
  switch (operator) {
    case '+':
      return String(parseInt(beforeNumber, 10) + parseInt(afterNumber, 10));
    default:
      break;
  }
};

const handleClickEqual = (operatorText, input) => {
  const findOperatorArray = input.match(checkNotNumber);
  // NOTE : input에 연산자가 없거나, 연산자가 있지만 연산자 이후 바로 "="이 들어오는 경우 계산없이 받아온 input 그대로 return
  if (!findOperatorArray || input[input.length - 1] === String(findOperatorArray)) {
    return input;
  }

  const splitNumberArray = input.split(checkNotNumber);
  const [leftNumber, rightNumber] = splitNumberArray;
  const [operator] = findOperatorArray;

  return handleCalculate(leftNumber, operator, rightNumber);
};

const handleDisplayOperator = (operator, input) => {
  const result = input.concat(operator);
  const operatorLimitConditionLength = result.split(operator).length;

  // NOTE :operatorList이 두개이상 들어올경우 받아온 alert이후 input 그대로 return ("=")제외
  if (operatorLimitConditionLength > 2) {
    alert(LENGTH_LIMIT_OPERATOR);
    return input;
  }

  return result;
};

export { handleClickEqual, handleDisplayOperator };
