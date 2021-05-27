import { $on, qs } from './utils/helpers.js';
import { EVENT_TYPE } from './utils/constants.js';

function Result() {
  this.leftSide = '';
  this.rightSide = '';
  this.op = '';

  this.$result = qs('#total');
  this.render = (currentResult) => {
    if (currentResult) {
      this.$result.innerText = currentResult;
    } else {
      this.$result.innerText = `${this.leftSide}${this.op}${this.rightSide}`;
    }
  };

  this.setOperand = (digit) => {
    let current = this.op ? this.rightSide : this.leftSide;
    if (current.length >= 3) {
      alert('no more 3');
      return;
    } else if (current === '' && digit === '0') return;
    current += digit;
    this.op ? (this.rightSide = current) : (this.leftSide = current);
    this.render();
  };

  this.processing = () => {
    const options = {
      '+': () => +this.leftSide + +this.rightSide,
      '-': () => +this.leftSide - +this.rightSide,
      X: () => +this.leftSide * +this.rightSide,
      '/': () => +this.leftSide / +this.rightSide,
    };
    const res = String(options[this.op]());
    this.render(res);
    this.init();
    this.leftSide = res;
  };

  this.setOperator = (op) => {
    if (!this.op && op === '=') return;
    if (op === '=') {
      this.processing();
      return;
    }
    if (this.op) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      return;
    }

    this.op = op;
    this.render();
  };

  this.allClear = () => {
    this.init();
    this.render('0');
  };

  this.init = () => {
    this.leftSide = '';
    this.rightSide = '';
    this.op = '';
  };
}

export default function calculator() {
  const result = new Result();

  const eventHandling = ({ target }) => {
    const button = target.closest('button');
    if (!button) return;
    const option = {
      digit: result.setOperand,
      operation: result.setOperator,
      modifier: result.allClear,
    };
    option[button.className](button.innerText);
  };

  const $calculator = qs('.calculator');
  $on($calculator, EVENT_TYPE.CLICK, eventHandling);
}
