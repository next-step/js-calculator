import { divideOperatorAndNumber } from '../utils/index.js';

class Calculator {
  constructor({ $target }) {
    this.$target = $target;
    this.$total = $target.querySelector('#total');
    this.state = {
      sum: null,
      opertator: null,
    };
    this.initialize();
  }

  setState(nextState) {
    if (Number.isNaN(nextState.sum)) {
      nextState = {
        ...nextState,
        sum: 0,
      };
    }
    this.state = nextState;
    this.renderTotal();
  }

  add(a, b) {
    console.log(Number(a) + Number(b));
    this.setState({ ...this.state, sum: Number(a) + Number(b) });
  }

  subtract(a, b) {
    this.setState({ ...this.state, sum: Number(a) - Number(b) });
  }

  multiple(a, b) {
    this.setState({ ...this.state, sum: Number(a) * Number(b) });
  }

  divide(a, b) {
    this.setState({ ...this.state, sum: Math.round(Number(a) / Number(b)) });
  }

  clear() {
    this.setState({ sum: '0', operator: null });
  }

  renderTotal() {
    this.$total.innerText = this.state.sum;
  }

  makeResult() {
    const [a, b, operator] = divideOperatorAndNumber(this.state.sum || '0');
    if (operator === '+') return this.add(a, b);
    if (operator === '-') return this.subtract(a, b);
    if (operator === 'X') return this.multiple(a, b);
    if (operator === '/') return this.divide(a, b);
  }

  addNumberListener() {
    const numberButtons = document.querySelectorAll('.digit');
    numberButtons.forEach((element) => {
      element.addEventListener('click', (e) => {
        const [a, b] = divideOperatorAndNumber(
          (this.state.sum || '') + e.target.innerHTML
        );

        const OEVER_THREE_NUMBER_CONDITION = a.length > 3 || b.length > 3;
        if (OEVER_THREE_NUMBER_CONDITION) {
          return window.alert('숫자는 세 자리까지만 입력 가능합니다!');
        }

        if (this.state.sum === '0') {
          this.setState({
            ...this.state,
            sum: null,
          });
        }

        this.setState({
          ...this.state,
          sum: (this.state.sum || '') + e.target.innerHTML,
        });
      });
    });
  }

  addOperatorListener() {
    const operatorButtons = document.querySelectorAll('.operation');
    operatorButtons.forEach((element) => {
      element.addEventListener('click', (e) => {
        const OVER_TWO_OPERATOR_CONDITION =
          this.state.operator && e.target.innerText !== '=';
        const MAKE_RESULT_CONDITION =
          this.state.operator && this.state.sum && e.target.innerText === '=';
        const NO_OPERATOR_WITH_NUMBER =
          !this.state.operator && this.state.sum && e.target.innerText !== '=';

        if (OVER_TWO_OPERATOR_CONDITION) {
          return window.alert('두개의 숫자만 계산할 수 있습니다.');
        }

        if (MAKE_RESULT_CONDITION) {
          this.makeResult();
        }

        if (NO_OPERATOR_WITH_NUMBER) {
          this.setState({
            operator: e.target.innerText,
            sum: (this.state.sum || '') + e.target.innerText,
          });
        }
      });
    });
  }

  addModifierListener() {
    const modifierButton = document.querySelector('.modifier');
    modifierButton.addEventListener('click', (_) => {
      if (this.state.sum !== null) this.clear();
    });
  }

  initialize() {
    this.addNumberListener();
    this.addOperatorListener();
    this.addModifierListener();
  }
}

export default Calculator;
