const compute = (preOperand) => (operatorFunc) => (postOperand) => {
  return operatorFunc(preOperand, postOperand);
};

export { compute };
