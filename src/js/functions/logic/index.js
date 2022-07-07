const OPERATION = ['+', '-', 'X', '/'];

const isOpertaionExist = (operationTextArray, operation) => {
  return operationTextArray.indexOf(operation);
};

const arithmeticOperation = (leftPort, rightPort, operation) => {
  switch (operation) {
    case 'X':
      return leftPort * rightPort;
    case '/':
      return leftPort / rightPort;
    case '+':
      return leftPort + rightPort;
    case '-':
      return leftPort - rightPort;
  }
};

const calculate = (operationArray, digitTextArray, operationTextArray) => {
  if (operationArray.length === 0) return;

  const operation = operationArray.pop();
  let operationExist = isOpertaionExist(operationTextArray, operation);

  while (0 <= operationExist) {
    const leftPort = Number(digitTextArray[operationExist]);
    const rightPort = Number(digitTextArray[operationExist + 1]);

    digitTextArray[operationExist] = arithmeticOperation(
      leftPort,
      rightPort,
      operation
    );

    operationTextArray.splice(operationExist, 1);
    digitTextArray.splice(operationExist + 1, 1);
    operationExist = isOpertaionExist(operationTextArray);
  }

  calculate(operationArray, digitTextArray, operationTextArray);
};

export const arithmeticExpression = (digitTextArray, operationTextArray) => {
  const operationArray = [...OPERATION];
  calculate(operationArray, digitTextArray, operationTextArray);
};
