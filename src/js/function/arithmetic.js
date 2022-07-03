let digitGroup = '';
const digitTextArray = [];
const operationTextArray = [];

export const setEnterTextInTotal = (buttonText) => {
  const totalText = total.innerText === '0' ? '' : total.innerText;
  total.innerText = totalText + buttonText;
};

export const digitValidationCheck = (buttonText) => {
  if (digitGroup.length >= 3) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return false;
  }

  digitGroup = digitGroup + buttonText;
  return true;
};

export const operationValidationCheck = (buttonText) => {
  if (digitGroup === '') {
    return false;
  }

  digitTextArray.push(digitGroup);
  operationTextArray.push(buttonText);
  digitGroup = '';
  return true;
};

export const arithmeticOperation = (leftPort, rightPort, operation) => {
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

export const arithmeticExpression = () => {
  const operationArray = ['/', 'X', '-', '+'];

  for (let i = 0; i < operationArray.length; i++) {
    let operationIndexOf = operationTextArray.indexOf(operationArray[i]);
    while (0 <= operationIndexOf) {
      const leftPort = Number(digitTextArray[operationIndexOf]);
      const rightPort = Number(digitTextArray[operationIndexOf + 1]);

      digitTextArray[operationIndexOf] = arithmeticOperation(
        leftPort,
        rightPort,
        operationArray[i]
      );

      operationTextArray.splice(operationIndexOf, 1);
      digitTextArray.splice(operationIndexOf + 1, 1);
      operationIndexOf = operationTextArray.indexOf(operationArray[i]);
    }
  }

  digitGroup = String(parseInt(digitTextArray[0]));
  total.innerText = digitGroup;
  digitTextArray.length = 0;
  operationTextArray.length = 0;
};
