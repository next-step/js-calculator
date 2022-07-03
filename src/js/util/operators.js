const add = (preOperand, postOperand) => preOperand + postOperand;

const subtract = (preOperand, postOperand) => preOperand - postOperand;

const multiply = (preOperand, postOperand) => preOperand * postOperand;

const divide = (preOperand, postOperand) => preOperand / postOperand;

const op = {
  '+': add,
  '-': subtract,
  X: multiply,
  '/': divide,
};
export { op };
