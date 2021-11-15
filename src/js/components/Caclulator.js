import Total from './Total.js';
import Digits from './Digits.js';
import Operations from './Operations.js';
import Modifiers from './Modifiers.js';
import { OPERATOR, caculate } from '../utils/math.js';

class Caculator {
  constructor() {
    this.state = {
      input: null,
      prevType: null,
      stack: [],
    };
    this.subsribes = [];
    this.init();
  }

  init() {
    const total = new Total({
      element: document.querySelector('#total'),
      total: this.state.total,
    });

    new Digits({
      element: document.querySelector('.digits'),
      onClick: (digit) => this.updateDigits(digit),
    });

    new Operations({
      element: document.querySelector('.operations'),
      onClick: (operation) => this.updateOperation(operation),
    });

    new Modifiers({
      element: document.querySelector('.modifiers'),
      onClick: (modifier) => this.updateModifier(modifier),
    });

    this.subsribes.push((state) => total.render(state));
  }

  setState(nextState) {
    this.state = nextState;
    this.notify(nextState);
  }

  notify(nextState) {
    this.subsribes.forEach((fn) => fn(nextState));
  }

  validateEditDigit(newInput) {
    const maxSize = 3;
    return newInput.length <= maxSize;
  }

  editDigit(digit) {
    const { stack, input } = this.state;
    const newInput = Number(input) ? `${input}${digit}` : `${digit}`;
    if (!this.validateEditDigit(newInput)) {
      alert('최대 입력 숫자는 3자리 수 입니다');
      return;
    }

    this.setState({
      ...this.state,
      input: newInput,
      stack: [...stack.slice(0, stack.length - 1), newInput],
      prevType: 'digit',
    });
  }

  addDigit(digit) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: digit,
      stack: [...stack, digit],
      prevType: 'digit',
    });
  }

  updateDigits(digit) {
    const { prevType } = this.state;
    if (prevType === 'digit') {
      this.editDigit(digit);
      return;
    }

    this.addDigit(digit);
  }

  editOperation(operation) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: operation,
      stack: [...stack.slice(0, stack.length - 1), operation],
      prevType: 'operation',
    });
  }

  addOperation(operation) {
    const { stack } = this.state;
    this.setState({
      ...this.state,
      input: operation,
      stack: [...stack, operation],
      prevType: 'operation',
    });
  }

  updateOperation(operation) {
    if (operation === '=') {
      this.caculateResult();
      return;
    }

    const { prevType } = this.state;
    if (prevType === 'operation') {
      this.editOperation(operation);
      return;
    }

    this.addOperation(operation);
  }

  updateModifier(modifier) {
    if (modifier !== 'AC') {
      return;
    }

    this.reset();
  }

  reset() {
    this.setState({
      ...this.state,
      input: null,
      prevType: null,
      stack: [],
    });
  }

  caculateResult() {
    const { stack } = this.state;

    const { current: result } = stack.reduce(
      (acc, cur) => {
        if (!Number(cur)) {
          acc.operation = cur;
          return acc;
        }

        if (!acc.current) {
          acc.current = cur;
          return acc;
        }

        if (acc.operation && acc.current) {
          const { current, operation } = acc;

          acc.current = caculate[OPERATOR[operation]](Number(current), Number(cur));
        }

        return acc;
      },
      { current: null, operation: null },
    );

    this.setState({
      ...this.state,
      input: result,
      prevType: null,
      stack: [result],
    });
  }
}

export default Caculator;
