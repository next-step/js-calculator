import {
  EXCEPT_EQUAL_OPERATORS_ARRAY,
  LENGTH_LIMIT_TEXT,
  MAX_NUMBER_LENGTH,
} from './constants.js';
import checkNotNumber from './regex.js';

const handleNumber = (number, input) => {
  const result = input.concat(number);
  const numberLengthList = result
    .split(checkNotNumber)
    .map((num) => num.length);
  const findOperatorText = String(result.match(checkNotNumber));
  const noAlertCondition =
    EXCEPT_EQUAL_OPERATORS_ARRAY.includes(findOperatorText);

  for (const [index, numberLength] of numberLengthList.entries()) {
    // NOTE : 배열의 index가 0이면서 input에 연산자가 있지않을경우를 제외하고는 입력숫자 3자리수 제한 -> 계산된 숫자가 4자리수 이상이될때 버그방지
    if (
      !(index === 0 && noAlertCondition) &&
      numberLength > MAX_NUMBER_LENGTH
    ) {
      alert(LENGTH_LIMIT_TEXT);
      return input;
    }
  }

  return result;
};

export default handleNumber;
