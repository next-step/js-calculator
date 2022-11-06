import { OPERATOR } from './const.js';
import { isNodeContains } from './utils.js';

class App {
  constructor($target, calculator) {
    this.$target = $target;
    this.calculator = calculator;
    this.initEventHandler();
    this.updateDisplay();
  }

  updateDisplay() {
    const { getDisplay } = this.calculator;

    this.$target.querySelector('#total').innerHTML = getDisplay();
  }

  handleClickDigit(digit) {
    const { setNumber, appendNumber, isOverMaxLength } = this.calculator;

    const nextNumber = appendNumber(Number(digit));
    if (isOverMaxLength(nextNumber)) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
    } else {
      setNumber(nextNumber);
    }
  }

  handleClickAllClear() {
    const { clear } = this.calculator;

    clear();
  }

  handleClickOperator(nextOperator) {
    const { compute, setOperator } = this.calculator;

    if (nextOperator === OPERATOR.ASSIGNMENT) {
      compute();
    } else {
      setOperator(nextOperator);
    }
  }

  handleClickTarget = (e) => {
    if (isNodeContains(this.querySelector('.digits'), e.target)) {
      this.handleClickDigit(e.target.textContent);
      this.updateDisplay();
    }

    if (isNodeContains(this.querySelector('.modifiers'), e.target)) {
      this.handleClickAllClear();
      this.updateDisplay();
    }

    if (isNodeContains(this.querySelector('.operations'), e.target)) {
      this.handleClickOperator(e.target.textContent);
      this.updateDisplay();
    }
  };

  initEventHandler() {
    this.$target.addEventListener('click', this.handleClickTarget);
  }

  querySelector(query) {
    return this.$target.querySelector(query);
  }
}

export default App;
