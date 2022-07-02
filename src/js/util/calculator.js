const compute = (preOperand) => (operatorFunc) => (postOperand) => {
  return operatorFunc && postOperand
    ? operatorFunc(+preOperand, +postOperand)
    : +preOperand;
};

const arrayToMergedString = (inputArray, defaultValue = '') =>
  inputArray.reduce((before, next) => before + next, defaultValue);

export { compute, arrayToMergedString };
