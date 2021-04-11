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

  const insertNumber = (value) => {
    if (num1) {
      num2 = Number(value);
      return;
    }
    num1 = Number(value);

    console.log(num1, num2);
  };

  const insertOperator = (value) => {
    operator = value;
  };

  const run = () => {
    if (!operator || operator === OPERATIONS.RESULT) {
      return num1;
    }
    const result = operate[operator](num1, num2);
    num1 = result;
    num2 = null;

    return result;
  };

  return {
    insertNumber,
    insertOperator,
    run,
  };
}
