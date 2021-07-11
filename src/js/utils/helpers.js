export const OPERATORS = {
  //prettier-ignore
  "X": MULTIPLY,
  "/": DIVIDE,
  "+": PLUS,
  "-": MINUS,
};

function PLUS(a, b) {
  return a + b;
}
function MINUS(a, b) {
  return a - b;
}
function MULTIPLY(a, b) {
  return a * b;
}
function DIVIDE(a, b) {
  return Math.floor(a / b);
}
