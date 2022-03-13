export const operations = {
  ADD: '+',
  SUBSTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  CALCULATE: '=',
};

class Calculator {
  #inputBuffer = [''];

  #total = 0;

  input(value) {
    const inputType = Calculator.#inputValidator(value);

    if (inputType === 'number') this.#numberInput(value);
    if (inputType === 'operation') this.#operationInput(value);

    this.#setDisplay();
  }

  static #inputValidator(value) {
    if (!Number.isNaN(+value)) return 'number';
    if (Object.values(operations).includes(value)) return 'operation';

    return alert('알 수 없는 값을 입력하셨습니다?!');
  }

  #numberInput(value) {
    const bufferLength = this.#inputBuffer.length;
    const bufferLastValue = this.#inputBuffer[bufferLength - 1];

    if (Calculator.#isNumberInputPush(bufferLastValue)) {
      this.#inputBuffer.push(value);
      return;
    }

    if (Calculator.#isNumberInputAdd(bufferLastValue)) {
      this.#inputBuffer[bufferLength - 1] += value;
    }
  }

  static #isNumberInputPush(target) {
    return Object.values(operations).includes(target);
  }

  static #isNumberInputAdd(target) {
    if (target.length >= 3) {
      return alert('세자리 이하의 숫자만 가능합니다!');
    }

    return true;
  }

  #operationInput(value) {
    const bufferLength = this.#inputBuffer.length;
    const bufferLastValue = this.#inputBuffer[bufferLength - 1];

    if (Calculator.#isOperationInputPush(bufferLastValue)) {
      this.#inputBuffer.push(value);
    }
  }

  static #isOperationInputPush(target) {
    if (Object.values(operations).includes(target) || target === '') {
      return alert('숫자를 먼저 입력해주세요!');
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
    this.#inputBuffer = [total];

    this.#setDisplay();
    this.#inputBuffer = [''];
  }

  allClear() {
    this.#inputBuffer = [''];
    this.#setDisplay();
  }

  #setDisplay() {
    const $total = document.querySelector('#total');
    const lastBufferValue = this.#inputBuffer[this.#inputBuffer.length - 1];

    const total = lastBufferValue === '' ? 0 : this.#inputBuffer.join('');

    $total.textContent = total;
  }
}

export default Calculator;
