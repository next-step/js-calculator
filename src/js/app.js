import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import Modifiers from './components/Modifiers.js';
import { $ } from './utils/dom.js';
import { isOperation } from './utils/validate.js';
import { DOM, OPERATOR, MODIFIER, INIT_STATE } from './constants.js';

class App {
  constructor(target) {
    this.$target = $(target);
    this.state = {
      currentTotal: INIT_STATE.currentTotal,
      numberCount: INIT_STATE.numberCount,
    };
    this.$digits = new Digits($(DOM.digits), this.onClickButtons.bind(this));
    this.$operations = new Operations($(DOM.operations), this.onClickButtons.bind(this));
    this.$modifiers = new Modifiers($(DOM.modifiers), this.onClickButtons.bind(this));
    this.$total = new Total($(DOM.total), this.state.currentTotal);
  }

  setState(nextState) {
    this.state = nextState;
    this.$total.setState(this.state.currentTotal);
  }

  onClickButtons(clickedValue) {
    if (clickedValue === MODIFIER.allClear) {
      this.setState({ currentTotal: INIT_STATE.currentTotal, numberCount: INIT_STATE.numberCount });
    } else if (clickedValue === OPERATOR.equal) {
      this.evaluateDigitsAndOperations(this.state.currentTotal);
    } else if (isOperation(clickedValue)) {
      this.recordOperation(clickedValue);
    } else {
      this.recordDigit(clickedValue);
    }
  }

  recordOperation(operation) {
    if (this.state.currentTotal === INIT_STATE.currentTotal) {
      alert('연산자 입력 전에 숫자를 입력해주세요.');
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + operation,
        numberCount: INIT_STATE.numberCount,
      });
    }
  }

  recordDigit(digit) {
    if (this.state.currentTotal === INIT_STATE.currentTotal) {
      this.setState({ currentTotal: digit, numberCount: this.state.numberCount + 1 });
    } else if (this.state.numberCount >= 3) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + digit,
        numberCount: this.state.numberCount + 1,
      });
    }
  }

  evaluateDigitsAndOperations(expression) {
    const operator = this.whatOperatorUseInExpression(expression);
    this.calculateExpressionWithOperator(expression, operator);
  }

  whatOperatorUseInExpression(expression) {
    if (expression.includes(OPERATOR.plus)) return OPERATOR.plus;
    if (expression.includes(OPERATOR.minus)) return OPERATOR.minus;
    if (expression.includes(OPERATOR.multiple)) return OPERATOR.multiple;
    if (expression.includes(OPERATOR.division)) return OPERATOR.division;
    return false;
  }

  calculateExpressionWithOperator(expression, operator) {
    const bothSidesOfOperator = expression.split(operator);
    const evaluationResult = bothSidesOfOperator.reduce((acc, cur) =>
      this.calculateReduceWithOperator(acc, operator, cur),
    );
    this.setState({
      currentTotal: evaluationResult,
      numberCount: String(evaluationResult).length,
    });
  }

  calculateReduceWithOperator(acc, operator, cur) {
    switch (operator) {
      case OPERATOR.plus:
        return Number(acc) + Number(cur);
      case OPERATOR.minus:
        return Number(acc) - Number(cur);
      case OPERATOR.multiple:
        return Number(acc) * Number(cur);
      case OPERATOR.division:
        return Math.floor(Number(acc) / Number(cur));
      default:
        return false;
    }
  }
}

export default App;
