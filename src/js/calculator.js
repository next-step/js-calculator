import { MAX_NUMBER_LENGTH, OPERATION, ALERT_MESSAGE } from './constants.js';

const calculateTotal = {
  [OPERATION.PLUS]: (firstNumber, secondNumber) => firstNumber + secondNumber,
  [OPERATION.MINUS]: (firstNumber, secondNumber) => firstNumber - secondNumber,
  [OPERATION.MULTIPLY]: (firstNumber, secondNumber) => firstNumber * secondNumber,
  [OPERATION.DIVIDE]: (firstNumber, secondNumber) => Math.floor(firstNumber / secondNumber),
};

const initialState = {
  firstNumber: null,
  operation: '',
  secondNumber: null,
  totalValue: '0',
};

class Calculator {
  constructor({ $total, $digits, $modifier, $operations }) {
    this.$total = $total;
    this.$digits = $digits;
    this.$modifier = $modifier;
    this.$operations = $operations;
    this.state = { ...initialState };
  }

  initEvents() {
    this.$digits.addEventListener('click', (e) => this.clickDigit(e.target));
    this.$modifier.addEventListener('click', (e) => this.clickModifier(e));
    this.$operations.addEventListener('click', (e) => this.clickOperation(e.target));
  }

  isOverNumberLength(newNumber) {
    if (String(newNumber).length > MAX_NUMBER_LENGTH) {
      alert(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
      return true;
    }
    return false;
  }

  setNewNumber(clickedNumber) {
    const currentKey = this.state.operation ? 'secondNumber' : 'firstNumber';
    const newNumber = (this.state[currentKey] * 10 ?? 0) + clickedNumber;

    if (!this.isOverNumberLength(newNumber)) {
      this.state[currentKey] = newNumber;
    }
  }

  setTotal() {
    const { firstNumber, operation, secondNumber } = this.state;

    if (secondNumber === null) {
      alert(ALERT_MESSAGE.NOT_SECOND_NUMBER);
      return;
    }

    const totalValue = calculateTotal[operation](firstNumber, secondNumber);

    this.state = { ...initialState, firstNumber: totalValue };
  }

  clickDigit({ dataset }) {
    const clickedNumber = parseInt(dataset.digit, 10);

    this.setNewNumber(clickedNumber);

    this.renderTotal();
  }

  clickModifier() {
    this.state = { ...initialState };
    this.renderTotal();
  }

  clickOperation({ dataset }) {
    if (this.state.firstNumber === null) {
      alert(ALERT_MESSAGE.NOT_FIRST_NUMBER);
      return;
    }

    const clickedOperation = dataset.operation;

    if (clickedOperation === '=') {
      this.setTotal();
    } else {
      this.state.operation = clickedOperation;
    }

    this.renderTotal();
  }

  renderTotal() {
    const { firstNumber, operation, secondNumber } = this.state;
    this.$total.textContent = `${firstNumber ?? 0}${operation ?? ''}${secondNumber ?? ''}`;
  }
}

export default Calculator;
