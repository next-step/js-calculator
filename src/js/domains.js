import { OPERATION } from './constants.js';

/**
 * @name 계산식
 */
export const calculationFormulas = {
  [OPERATION.PLUS]: (a, b) => Number(a) + Number(b),
  [OPERATION.MINUS]: (a, b) => Number(a) - Number(b),
  [OPERATION.MULTIPLICATION]: (a, b) => Number(a) * Number(b),
  [OPERATION.DIVISION]: (a, b) => Number(a) / Number(b),
};

/**
 * @name calculateStep값 가져오기
 */
export const getCalculateStep = (operators, calculateStep) => (operators[calculateStep] ? calculateStep + 1 : calculateStep);

/**
 * @name digit값 추가하기
 * @returns digit값이 추가된 digits리턴
 */
export const addDigitNumber = (digits, calculateStep, addDigit) => {
  const digit = digits[calculateStep];
  if (!digit) {
    if (digits.length) {
      digits.push(addDigit);
      return digits;
    }
    return [addDigit];
  }

  digits[calculateStep] = digit + addDigit;

  return digits;
};

/**
 * @name operation값 추가하기
 * @returns operation값이 추가된 operators리턴
 */
export const addOperation = (operators, calculateStep, operatorValue) => {
  if (operators[calculateStep]) {
    operators[calculateStep] = operatorValue;
  } else {
    operators.push(operatorValue);
  }

  return operators;
};

/**
 * @name 계산된 total값 가져오기
 */
export const getTotal = (digits, operators) => {
  const total = digits.reduce((prev, current, calculateStep) => {
    if (prev !== 0 && operators[calculateStep - 1]) {
      return calculationFormulas[operators[calculateStep - 1]](prev, current);
    }

    return prev + Number(current);
  }, 0);

  return Math.floor(total).toString();
};

/**
 * @name 기호와 같이 보여주는 total값 가져오기
 */
export const getTotalWithOperation = (digits, operators) => {
  const total = digits.reduce((prev, current, calculateStep) => {
    if (operators[calculateStep]) {
      return prev + current + operators[calculateStep];
    }
    return prev + current;
  }, '');

  return total;
};
