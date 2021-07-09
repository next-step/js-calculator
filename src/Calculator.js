import { ERROR_MESSEAGE, OPERRATORS, RESTRICTIONS } from './constants.js';
import { qs } from './helpers.js';

const DISPLAY = qs('#total');

const updateDisplay = (value) => {
  return (DISPLAY.innerText = value);
};

const putResult = (curValue) => {
  const strs = curValue.split(/(\+|-|X|\/)/);
  const result = compute(strs);
  return updateDisplay(result);
};

const compute = (strs) => {
  const ops = [
    { [OPERRATORS.MULTI]: (a, b) => a * b },
    { [OPERRATORS.DIVISION]: (a, b) => Math.floor(a / b) },
    { [OPERRATORS.MINUS]: (a, b) => a - b },
    { [OPERRATORS.PLUS]: (a, b) => a + b },
  ];
  let newCalc = [];
  let curOp = null;

  for (const op of ops) {
    for (const str of strs) {
      if (op[str]) {
        curOp = op[str];
      } else if (curOp) {
        const num1 = +newCalc[newCalc.length - 1];
        const num2 = +str;
        newCalc[newCalc.length - 1] = curOp(num1, num2);
        curOp = null;
      } else {
        newCalc.push(str);
      }
    }
    strs = newCalc;
    newCalc = [];
  }

  return strs[0];
};

const isVaildDigitLength = (curValue) => {
  const nums = curValue.split(/\+|-|X|\//);
  const lastNumLeght = nums[nums.length - 1].length;

  return lastNumLeght < RESTRICTIONS.MAX_DIGIT_LENGTH;
};

const isAbleAddOperator = (curValue) => {
  return (
    curValue !== RESTRICTIONS.INITAL_VALUE &&
    /\d/.test(curValue[curValue.length - 1])
  );
};

export const putNumber = (num) => {
  const curValue = DISPLAY.innerText;

  if (!isVaildDigitLength(curValue)) {
    return alert(ERROR_MESSEAGE.INVAILD_DIGIT_LENGTH);
  }
  if (curValue === RESTRICTIONS.INITAL_VALUE) {
    return updateDisplay(num);
  }

  return updateDisplay(curValue + num);
};

export const putOperator = (operator) => {
  const curValue = DISPLAY.innerText;

  if (!isAbleAddOperator(curValue)) {
    return alert(ERROR_MESSEAGE.INVAILD_OPERATION);
  }
  if (operator === OPERRATORS.EQUAL) {
    return putResult(curValue);
  }

  return updateDisplay(curValue + operator);
};

export const allClear = () => {
  return updateDisplay(RESTRICTIONS.INITAL_VALUE);
};
