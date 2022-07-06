const LIMITED_PLACE_VALUE = 3;

const isLimitNumber = (oldNumber = '', limitLength) =>
  oldNumber?.length >= limitLength;

const isFalsyEnteredNumber = (enteredValue) => !+enteredValue;

const isEnterFromZeroToZero = (prevValue, enterValue) =>
  +prevValue === 0 && +enterValue === 0;

export {
  LIMITED_PLACE_VALUE,
  isLimitNumber,
  isFalsyEnteredNumber,
  isEnterFromZeroToZero,
};
