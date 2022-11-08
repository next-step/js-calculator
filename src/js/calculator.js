import { CALCULATOR_DEFAULT_VALUE, MAX_NUMBER_LENGTH } from '../constants.js';
import {
  divideOperatorAndNumber,
  makeOnOperatorConditions,
} from '../utils/index.js';
class Calculator {
  constructor({ $target }) {
    this.$target = $target;
    this.$total = $target.querySelector('#total');
    this.state = {
      sum: CALCULATOR_DEFAULT_VALUE,
      opertator: null,
    };
    this.initialize();
  }

  setState(nextState) {
    if (Number.isNaN(nextState.sum)) {
      nextState = {
        ...nextState,
        sum: CALCULATOR_DEFAULT_VALUE,
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
    this.setState({ sum: CALCULATOR_DEFAULT_VALUE, operator: null });
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

  onOperator(event) {
    const typedOperator = event.target.innerText;
    const {
      OVER_TWO_OPERATOR_CONDITION,
      MAKE_RESULT_CONDITION,
      NO_OPERATOR_WITH_NUMBER,
    } = makeOnOperatorConditions({ state: this.state, typedOperator });

    if (OVER_TWO_OPERATOR_CONDITION) {
      return window.alert('두개의 숫자만 계산할 수 있습니다.');
    }

    if (MAKE_RESULT_CONDITION) {
      this.makeResult();
    }

    if (NO_OPERATOR_WITH_NUMBER) {
      this.setState({
        operator: typedOperator,
        sum: (this.state.sum || '') + typedOperator,
      });
    }
  }
  onModifier() {
    if (this.state.sum !== CALCULATOR_DEFAULT_VALUE) this.clear();
  }

  onNumber(event) {
    const typedNumber = event.target.innerText;
    const [a, b] = divideOperatorAndNumber(this.state.sum + typedNumber);

    const OEVER_THREE_NUMBER_CONDITION =
      a.length > MAX_NUMBER_LENGTH || b.length > MAX_NUMBER_LENGTH;

    if (OEVER_THREE_NUMBER_CONDITION) {
      return window.alert('숫자는 세 자리까지만 입력 가능합니다!');
    }

    const sum =
      this.state.sum === CALCULATOR_DEFAULT_VALUE
        ? typedNumber
        : this.state.sum + typedNumber;

    this.setState({
      ...this.state,
      sum,
    });
  }

  addListener() {
    this.$target.addEventListener('click', (event) => {
      const classList = event.target.classList;

      if (classList.contains('digit')) {
        this.onNumber(event);
      }

      if (classList.contains('operation')) {
        this.onOperator(event);
      }

      if (classList.contains('modifier')) {
        this.onModifier();
      }
    });
  }

  initialize() {
    this.addListener();
  }
}

export default Calculator;
