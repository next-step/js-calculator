const OPERATIONS = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLICATION: "X",
  DIVISION: "/",
  RESULT: "=",
};

const operate = {
  [OPERATIONS.PLUS]: (a, b = 0) => a + b,
  [OPERATIONS.MINUS]: (a, b = 0) => a - b,
  [OPERATIONS.MULTIPLICATION]: (a, b = 1) => a * b,
  [OPERATIONS.DIVISION]: (a, b = 1) => a / b,
};

export default function Calculator() {
  let num1, num2;
  let operator;

  const setNumber = (value) => {
    num1 ? (num2 = Number(value)) : (num1 = Number(value));
  };

  const setOperator = (value) => {
    operator = value;
  };

  const run = () => {
    if (!operator || operator === OPERATIONS.RESULT) {
      return num1;
    }

    const result = Math.floor(operate[operator](num1, num2));
    num1 = result;
    num2 = null;

    return result;
  };

  return {
    setNumber,
    setOperator,
    run,
  };
}
