import { OPERATION, ALRERT_MESSAGE } from './constants.js';

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

  init() {
    this.$digits.addEventListener('click', (e) => this.clickDigit(e.target));
    this.$modifier.addEventListener('click', (e) => this.clickModifier(e));
    this.$operations.addEventListener('click', (e) => this.clickOperation(e.target));
  }

  setTotal() {
    const { firstNumber, operation, secondNumber } = this.state;

    if (secondNumber === null) {
      return;
    }

    const totalValue = calculateTotal[operation](firstNumber, secondNumber);

    this.state = { ...initialState, firstNumber: totalValue };
  }

  clickDigit({ dataset }) {
    const clickedNumber = parseInt(dataset.digit, 10);
    const currentKey = this.state.operation ? 'secondNumber' : 'firstNumber';
    this.state[currentKey] = (this.state[currentKey] * 10 ?? 0) + clickedNumber;

    this.renderTotal();
  }

  clickModifier() {
    this.state = { ...initialState };
    this.renderTotal();
  }

  clickOperation({ dataset }) {
    if (this.state.firstNumber === null) {
      return alert(ALRERT_MESSAGE.NOT_FIRSTNUMBER);
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
