import {
  LENGTH_LIMIT_OPERATOR,
  MAX_NUMBER_LENGTH,
  MAX_OPERATOR_LENGTH,
  OPERATORS,
  SPLIT_NUMBER_ARRAY_LENGTH,
} from './constants.js';
import checkNotNumber from './regex.js';

const removeDecimalPoint = (countedNumber) => String(Math.floor(countedNumber));

const calculate = (beforeNumber, operator, afterNumber) => {
  const { plus, minus, multiplication, divide } = OPERATORS;
  switch (operator) {
    case plus:
      return removeDecimalPoint(
        parseInt(beforeNumber, 10) + parseInt(afterNumber, 10)
      );
    case minus:
      return removeDecimalPoint(
        parseInt(beforeNumber, 10) - parseInt(afterNumber, 10)
      );
    case multiplication:
      return removeDecimalPoint(
        parseInt(beforeNumber, 10) * parseInt(afterNumber, 10)
      );
    case divide:
      return removeDecimalPoint(
        parseInt(beforeNumber, 10) / parseInt(afterNumber, 10)
      );
    default:
      break;
  }
};

const calculatedResult = (operatorText, input) => {
  const findOperatorArray = input.match(checkNotNumber);

  const hasNoOperator = !findOperatorArray;
  const hasNoRightValue = input[input.length - 1] === String(findOperatorArray);
  if (hasNoOperator || hasNoRightValue) {
    return input;
  }

  const splitNumberArray = input.split(checkNotNumber);
  let [leftNumber, rightNumber] = splitNumberArray;
  let [operator] = findOperatorArray;

  // NOTE : 결과값이 "-"가 나오는 케이스 대응로직
  if (
    splitNumberArray.length === SPLIT_NUMBER_ARRAY_LENGTH &&
    splitNumberArray[0] === ''
  ) {
    leftNumber = `-${splitNumberArray[1]}`;
    rightNumber = splitNumberArray[2];
    operator = findOperatorArray[1];
  }

  return calculate(leftNumber, operator, rightNumber);
};

const displayOperator = (operator, input) => {
  const result = input.concat(operator);
  const operatorLimitConditionLength = result.split(checkNotNumber).length;

  // NOTE :operatorList이 두개이상 들어올경우 받아온 alert이후 input 그대로 return ("=")제외
  if (input[0] === OPERATORS.minus) {
    if (operatorLimitConditionLength > MAX_NUMBER_LENGTH) {
      alert(LENGTH_LIMIT_OPERATOR);
      return input;
    }
  } else if (operatorLimitConditionLength > MAX_OPERATOR_LENGTH) {
    alert(LENGTH_LIMIT_OPERATOR);
    return input;
  }

  return result;
};

export { calculatedResult, displayOperator };
