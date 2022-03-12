const operations = ['+', '-', 'X', '/', '='];

class Calculator {
  #inputBuffer = [''];

  // calculate(operation, leftValue, rightValue) {
  //   this.total = operation(leftValue, rightValue);
  // }

  #setDisplay() {
    const $total = document.querySelector('#total');
    const lastBufferValue = this.#inputBuffer[this.#inputBuffer.length - 1];

    const total = lastBufferValue === '' ? 0 : this.#inputBuffer.join('');

    $total.textContent = total;
  }

  static #inputValidator(value) {
    if (!Number.isNaN(+value)) return 'number';
    if (operations.includes(value)) return 'operation';

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
    return operations.includes(target);
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
    if (operations.includes(target) || target === '') {
      return alert('숫자를 먼저 입력해주세요!');
    }

    return true;
  }

  input(value) {
    const inputType = Calculator.#inputValidator(value);

    if (inputType === 'number') this.#numberInput(value);
    if (inputType === 'operation') this.#operationInput(value);

    this.#setDisplay();
  }

  allClear() {
    this.#inputBuffer = [''];
    this.#setDisplay();
  }

  // add() {
  //   this.total = this.#leftValue + this.#rightValue;
  // }

  // substract() {
  //   this.total = this.#leftValue - this.#rightValue;
  // }

  // divide() {
  //   this.total = this.#leftValue / this.#rightValue;
  // }

  // multiply() {
  //   this.total = this.#leftValue * this.#rightValue;
  // }
}

export default Calculator;
