import {
  LIMITED_PLACE_VALUE,
  isLimitNumber,
  isEnterFromZeroToZero,
  isFalsyEnteredNumber,
} from './validate.js';
import { op } from './operators.js';

const DEFAULT_VALUE = '0';
const ALERT_MSG = {
  POSSIBLE_THREE_PLACE_VALUE: '3자리 숫자만 입력 가능합니다.',
  INPUT_NUMBER_BEFORE_OPERATOR: '숫자를 먼저 입력하고 연산자를 입력해 주세요',
};

const calculatorModule = (totalEl) => {
  let enteredArray = [];
  let cursor = 0;

  const compute = (preOperand) => (operatorFunc) => (postOperand) => {
    return operatorFunc && postOperand
      ? operatorFunc(+preOperand, +postOperand)
      : +preOperand;
  };

  const arrayToMergedString = (inputArray, defaultValue = '') =>
    inputArray.reduce((before, next) => before + next, defaultValue);

  const initialData = (defaultValue = DEFAULT_VALUE) => {
    totalEl.innerHTML = defaultValue;
    enteredArray = [];
    cursor = 0;
  };

  const onNumberClickEvent = (e) => {
    const inputValue = e?.target?.innerHTML;
    if (!inputValue) return;

    if (isEnterFromZeroToZero(+inputValue, +enteredArray[cursor])) {
      return;
    }

    if (isLimitNumber(enteredArray[cursor], LIMITED_PLACE_VALUE)) {
      alert(ALERT_MSG.POSSIBLE_THREE_PLACE_VALUE);
      return;
    }

    if (isFalsyEnteredNumber(enteredArray[cursor])) {
      enteredArray[cursor] = inputValue;
    } else {
      enteredArray[cursor] = `${+enteredArray[cursor]}${inputValue}`;
    }

    totalEl.innerHTML = arrayToMergedString(enteredArray);
  };

  const onOperatorClickEvent = (e) => {
    const inputValue = e?.target?.innerHTML;
    if (!inputValue) return;

    if (inputValue === '=') {
      const result = compute(enteredArray[0])(op[enteredArray[1]])(
        enteredArray[2]
      );
      initialData(`${Math.floor(result)}`);
      return;
    }

    if (isFalsyEnteredNumber(enteredArray[cursor])) {
      alert(ALERT_MSG.INPUT_NUMBER_BEFORE_OPERATOR);
      return;
    }

    cursor++;
    enteredArray[cursor] = inputValue;
    cursor++;

    totalEl.innerHTML = arrayToMergedString(enteredArray);
  };

  return {
    compute,
    arrayToMergedString,
    initialData,
    onNumberClickEvent,
    onOperatorClickEvent,
  };
};

export { DEFAULT_VALUE, calculatorModule };
