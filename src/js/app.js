import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import Modifiers from './components/Modifiers.js';
import { $ } from './utils/dom.js';
import { isOperation } from './utils/validate.js';
import { DOM, OPERATION, MODIFIER, INIT_STATE, MESSAGE } from './constants.js';

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
    } else if (clickedValue === OPERATION.equal) {
      this.evaluateDigitsAndOperations(this.state.currentTotal);
    } else if (isOperation(clickedValue)) {
      this.recordOperation(clickedValue);
    } else {
      this.recordDigit(clickedValue);
    }
  }

  recordOperation(operation) {
    if (this.state.currentTotal === INIT_STATE.currentTotal) {
      alert(MESSAGE.pleaseEnterNumberBeforeOperator);
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
      alert(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + digit,
        numberCount: this.state.numberCount + 1,
      });
    }
  }

  evaluateDigitsAndOperations(expression) {
    const operation = this.whatOperatorUseInExpression(expression);
    this.calculateExpressionWithOperator(expression, operation);
  }

  whatOperatorUseInExpression(expression) {
    if (expression.includes(OPERATION.plus)) return OPERATION.plus;
    if (expression.includes(OPERATION.minus)) return OPERATION.minus;
    if (expression.includes(OPERATION.multiple)) return OPERATION.multiple;
    if (expression.includes(OPERATION.division)) return OPERATION.division;
    return false;
  }

  calculateExpressionWithOperator(expression, operation) {
    const bothSidesOfOperator = expression.split(operation);
    const evaluationResult = bothSidesOfOperator.reduce((acc, cur) =>
      this.calculateReduceWithOperator(acc, operation, cur),
    );
    this.setState({
      currentTotal: evaluationResult,
      numberCount: String(evaluationResult).length,
    });
  }

  calculateReduceWithOperator(acc, operation, cur) {
    switch (operation) {
      case OPERATION.plus:
        return Number(acc) + Number(cur);
      case OPERATION.minus:
        return Number(acc) - Number(cur);
      case OPERATION.multiple:
        return Number(acc) * Number(cur);
      case OPERATION.division:
        return Math.floor(Number(acc) / Number(cur));
      default:
        return false;
    }
  }
}

export default App;
