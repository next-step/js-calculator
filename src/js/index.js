const total = document.getElementById('total');
const modifier = document.getElementsByClassName('modifier');
const digitButtons = document.querySelectorAll('.digit');
const operationButtons = document.querySelectorAll('.operation');

const buttons = [...digitButtons, ...operationButtons];
const digitTextArray = [];
const operationTextArray = [];

let digitGroup = '';

const setEnterTextInTotal = (buttonText) => {
  const totalText = total.innerText === '0' ? '' : total.innerText;
  total.innerText = totalText + buttonText;
};

const digitValidationCheck = (buttonText) => {
  if (digitGroup.length === 3) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return false;
  }

  digitGroup = digitGroup + buttonText;
  return true;
};

const operationValidationCheck = (buttonText) => {
  if (digitGroup === '') {
    return false;
  }

  digitTextArray.push(digitGroup);
  operationTextArray.push(buttonText);
  digitGroup = '';
  return true;
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

const arithmeticExpression = () => {
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
  total.innerText = digitTextArray[0];
};

const onButtonClick = (event) => {
  console.log('test');
  const buttonText = event.target.innerText;

  const isCompleted = isNaN(buttonText)
    ? operationValidationCheck(buttonText)
    : digitValidationCheck(buttonText);

  if (!isCompleted) return;

  if (buttonText === '=') {
    arithmeticExpression();
    return;
  }

  setEnterTextInTotal(buttonText);
};

buttons.forEach((button) => {
  button.addEventListener('click', onButtonClick);
});
