import { MAX_LENGTH, OPERATOR } from './const.js';
import { isOverMaxLength } from './utils.js';

class App {
  constructor($target, calculator) {
    this.$target = $target;
    this.$digits = $target.querySelector('.digits');
    this.$modifiers = $target.querySelector('.modifiers');
    this.$operations = $target.querySelector('.operations');
    this.$total = $target.querySelector('#total');
    this.calculator = calculator;
    this.initEventHandler();
    this.updateDisplay();
  }

  updateDisplay() {
    const { getDisplay } = this.calculator;

    this.$total.innerText = getDisplay();
  }

  handleClickDigit(digit) {
    const { setNumber, appendNumber } = this.calculator;

    const nextNumber = appendNumber(Number(digit));
    if (isOverMaxLength(MAX_LENGTH, nextNumber.toString())) {
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
    if (this.$digits.contains(e.target)) {
      this.handleClickDigit(e.target.textContent);
      this.updateDisplay();
      return;
    }

    if (this.$modifiers.contains(e.target)) {
      this.handleClickAllClear();
      this.updateDisplay();
      return;
    }

    if (this.$operations.contains(e.target)) {
      this.handleClickOperator(e.target.textContent);
      this.updateDisplay();
      return;
    }
  };

  initEventHandler() {
    this.$target.addEventListener('click', this.handleClickTarget);
  }
}

export default App;
