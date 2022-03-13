import { ERROR_MESSAGE, MAX_DIGITS, OPERATORS } from './constants.js';
import { on, qs, qsAll } from './helpers.js';

export default class Calaulator {
  constructor() {
    this.total = qs('#total');
    this.digits = qsAll('.digit');
    this.operations = qsAll('.operation');
    this.ac = qs('.modifier');

    this.intializeButtons();
  }

  intializeButtons() {
    this.handleClickDigits();
    this.handleClickOperators();
    this.handleClickAC();
  }

  handleClickDigits() {
    this.digits.forEach((element) => {
      on(element, 'click', () => this.handleClickDigitHandler(element));
    });
  }

  handleClickDigitHandler(element) {
    const totalValue = total.innerText;
    const digitValue = element.innerText;

    if (this.checkOverThreeDigits(totalValue, digitValue)) {
      alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
      return;
    }

    total.innerText = totalValue === '0' ? digitValue : totalValue + digitValue;
  }

  handleClickOperators() {
    this.operations.forEach((element) => {
      on(element, 'click', () => this.handleClickOperatorHandler(element));
    });
  }

  handleClickOperatorHandler(element) {
    const totalValue = total.innerText;
    const operationValue = element.innerText;

    if (operationValue === OPERATORS.EQUAL) {
      const calculatingTargets = this.getCalculatingTargets(totalValue);
      const operation = this.getOperator(totalValue);
      const result = this.calculate(calculatingTargets, operation);
      total.innerText = result;
      return;
    }

    total.innerText = totalValue + operationValue;
  }

  handleClickAC() {
    on(this.ac, 'click', () => (total.innerText = '0'));
  }

  calculate(calculatingTargets, operation) {
    const [leftValue, rightValue] = calculatingTargets;

    switch (operation) {
      case OPERATORS.ADD:
        return Number(leftValue) + Number(rightValue);
      case OPERATORS.SUBTRACT:
        return Number(leftValue) - Number(rightValue);
      case OPERATORS.MULTIPLY:
        return Number(leftValue) * Number(rightValue);
      case OPERATORS.DIVIDE:
        return Math.floor(Number(leftValue) / Number(rightValue));
    }
  }

  getOperator(totalValue) {
    for (const value of totalValue) {
      if (
        value === OPERATORS.ADD ||
        value === OPERATORS.SUBTRACT ||
        value === OPERATORS.MULTIPLY ||
        value === OPERATORS.DIVIDE
      )
        return value;
    }
  }

  checkOverThreeDigits(totalValue, digitValue) {
    const digitValues = this.getCalculatingTargets(totalValue);
    const target = digitValues[digitValues.length - 1];

    return (target + digitValue).length > MAX_DIGITS;
  }

  getCalculatingTargets(totalValue) {
    return totalValue.split(/[X+-/_]/);
  }
}
