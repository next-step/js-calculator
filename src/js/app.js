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
    this.$target.querySelector('#total').innerHTML =
      this.calculator.getDisplay();
  }

  handleClickDigit = (e) => {
    const nextNumber = this.calculator.getAppendedNumber(
      Number(e.target.textContent)
    );

    if (this.calculator.isOverMaxLength(nextNumber)) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
    } else {
      this.calculator.setNumber(nextNumber);
    }
  };

  handleClickAllClear = () => {
    this.calculator.clear();
  };

  handleClickOperator = (e) => {
    const nextOperator = e.target.textContent;

    if (nextOperator === OPERATOR.ASSIGNMENT) {
      this.calculator.compute();
    } else {
      this.calculator.setOperator(nextOperator);
    }
  };

  handleClickTarget = (e) => {
    if (isNodeContains(this.querySelector('.digits'), e.target)) {
      this.handleClickDigit(e);
      this.updateDisplay();
    }

    if (isNodeContains(this.querySelector('.modifiers'), e.target)) {
      this.handleClickAllClear();
      this.updateDisplay();
    }

    if (isNodeContains(this.querySelector('.operations'), e.target)) {
      this.handleClickOperator(e);
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
