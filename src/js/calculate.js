const plus = (first, second) => first + second;

const minus = (first, second) => first - second;

const multiply = (first, second) => first * second;

const divide = (first, second) => Math.floor(first / second);

const calculate = {
  plus,
  minus,
  multiply,
  divide,
};

export default calculate;
