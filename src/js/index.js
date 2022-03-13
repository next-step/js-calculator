import { ERROR_MESSAGE } from './constants.js';
import { qs, qsAll, on } from './helpers.js';

const total = qs('#total');
const digits = qsAll('.digit');
const operations = qsAll('.operation');
const ac = qs('.modifier');

digits.forEach((element) => {
  on(element, 'click', () => {
    const totalValue = total.innerText;
    const digitValue = element.innerText;

    if (checkOverThreeDigits(totalValue, digitValue)) {
      alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
      return;
    }

    total.innerText = totalValue === '0' ? digitValue : totalValue + digitValue;
  });
});

operations.forEach((element) => {
  on(element, 'click', () => {
    const totalValue = total.innerText;
    const operationValue = element.innerText;

    const prevTotal = total.innerText;
    if (operationValue === '=') {
      const calculatingTargets = totalValue.split(/[X+-/_]/);
      const operation = getOperator(totalValue);
      const result = calculate(calculatingTargets, operation);
      total.innerText = result;
      return;
    }
    total.innerText = prevTotal + operationValue;
  });
});

on(ac, 'click', () => {
  total.innerText = '0';
});

const calculate = (calculatingTargets, operation) => {
  const [leftValue, rightValue] = calculatingTargets;

  switch (operation) {
    case '+':
      return Number(leftValue) + Number(rightValue);
    case '-':
      return Number(leftValue) - Number(rightValue);
    case 'X':
      return Number(leftValue) * Number(rightValue);
    case '/':
      return Number(leftValue) / Number(rightValue);
  }
};

const getOperator = (totalValue) => {
  for (const value of totalValue) {
    if (value === '+' || value === '-' || value === 'X' || value === '/')
      return value;
  }
};

const checkOverThreeDigits = (totalValue, digitValue) => {
  const digitValues = totalValue.split(/[X+-/_]/);
  const target = digitValues[digitValues.length - 1];
  return (target + digitValue).length === 4;
};
