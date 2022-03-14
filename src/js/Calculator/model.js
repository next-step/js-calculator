import { OPERATIONS, MAX_INPUT_DIGITS } from './constants';

const operations = Object.values(OPERATIONS);

class Calculator {
  #inputBuffer = [''];

  input(value) {
    const inputType = Calculator.#inputValidator(value);

    if (inputType === 'number') this.#numberInput(value);
    if (inputType === 'operation') this.#operationInput(value);

    this.#setDisplay();
  }

  static #inputValidator(value) {
    if (!Number.isNaN(+value)) return 'number';
    if (Object.values(operations).includes(value)) return 'operation';

    alert('알 수 없는 값을 입력하셨습니다?!');
    return false;
  }

  #numberInput(value) {
    const bufferLength = this.#inputBuffer.length;
    const bufferLastValue = this.#inputBuffer[bufferLength - 1];

    if (Calculator.#isNumberInputPush(bufferLastValue)) {
      this.#inputBuffer.push(value);
      return;
    }

    if (Calculator.#isNumberInputAdd(bufferLastValue)) {
      this.#inputBuffer[bufferLength - 1] =
        Calculator.#preventZeroStartNumber(bufferLastValue);
      this.#inputBuffer[bufferLength - 1] += value;
    }
  }

  static #isNumberInputPush(target) {
    return Object.values(operations).includes(target);
  }

  static #isNumberInputAdd(target) {
    if (target.length >= MAX_INPUT_DIGITS) {
      alert('세자리 이하의 숫자만 가능합니다!');
      return false;
    }

    return true;
  }

  static #preventZeroStartNumber(value) {
    if (Number(value) === 0) return '';

    return value;
  }

  #operationInput(value) {
    const display = Calculator.#getDisplay();

    if (!Number.isNaN(+display) && this.#inputBuffer[0] === '')
      this.#inputBuffer[0] = display;

    const bufferLength = this.#inputBuffer.length;
    const bufferLastValue = this.#inputBuffer[bufferLength - 1];

    if (Calculator.#isOperationInputPush(bufferLastValue)) {
      this.#inputBuffer.push(value);
    }
  }

  static #isOperationInputPush(target) {
    if (Object.values(operations).includes(target) || target === '') {
      alert('숫자를 먼저 입력해주세요!');
      return false;
    }

    return true;
  }

  calculate() {
    if (this.#inputBuffer[0] === '') return;

    const operators = Object.values(operations).filter((oper) => oper !== '=');

    if (operators.includes(this.#inputBuffer[this.#inputBuffer.length - 1])) {
      this.#inputBuffer.pop();
    }

    this.#inputBuffer = this.#inputBuffer.map((buf) => buf.replace('X', '*'));

    // eslint-disable-next-line no-eval
    const total = eval(this.#inputBuffer.join(''));
    const roundDownTotal = [Math.floor(total)];

    this.#inputBuffer = roundDownTotal;

    this.#setDisplay();
    this.#inputBuffer = [''];
  }

  allClear() {
    this.#inputBuffer = [''];
    this.#setDisplay();
  }

  static #getDisplay() {
    const $total = document.querySelector('#total');
    return $total.textContent;
  }

  #setDisplay() {
    const $total = document.querySelector('#total');
    const lastBufferValue = this.#inputBuffer[this.#inputBuffer.length - 1];

    const total = lastBufferValue === '' ? 0 : this.#inputBuffer.join('');

    $total.textContent = total;
  }
}

export default Calculator;
