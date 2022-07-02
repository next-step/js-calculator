const LIMITED_PLACE_VALUE = 3;
const LIMITED_DECIMAL_POINT = 0;

const checkLimitNumber = (oldNumber = '', newNumber, limitLength, callback) => {
  if (+oldNumber === 0) {
    return newNumber;
  }
  if (oldNumber?.length >= limitLength) {
    callback();
    return oldNumber;
  }
  return `${oldNumber}${newNumber}`;
};

const isFalsyEnteredNumber = (enteredValue) => !+enteredValue;

const isEnterFromZeroToZero = (prevValue, enterValue) =>
  +prevValue === 0 && +enterValue === 0;

export {
  LIMITED_PLACE_VALUE,
  LIMITED_DECIMAL_POINT,
  checkLimitNumber,
  isFalsyEnteredNumber,
  isEnterFromZeroToZero,
};
