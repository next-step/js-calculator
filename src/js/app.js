import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import Modifiers from './components/Modifiers.js';
import { $ } from './utils/dom.js';
import { validator, executor } from './utils/index.js';
import { DOM, OPERATION, MODIFIER, INIT_STATE, MESSAGE } from './constants.js';

class App {
  constructor(target) {
    this.$target = $(target);
    this.state = { ...INIT_STATE };
    this.$digits = new Digits($(DOM.digits), this.onClickDigit.bind(this));
    this.$operations = new Operations($(DOM.operations), this.onClickOperation.bind(this));
    this.$modifiers = new Modifiers($(DOM.modifiers), this.onClickModifier.bind(this));
    this.$total = new Total($(DOM.total), this.state.currentTotal);
  }

  setState(nextState) {
    this.state = nextState;
    this.$total.setState(this.state.currentTotal);
  }

  onClickDigit(digit) {
    if (this.state.numberCount >= 3) {
      alert(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
      return;
    }

    if (this.$total.isClean()) {
      this.setState({
        currentTotal: digit,
        numberCount: this.state.numberCount + 1,
        lastClickedButton: digit,
      });
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + digit,
        numberCount: this.state.numberCount + 1,
        lastClickedButton: digit,
      });
    }
  }

  onClickModifier(modifier) {
    if (modifier === MODIFIER.allClear) {
      this.setState({ ...INIT_STATE });
    }
  }

  onClickOperation(operation) {
    if (operation === OPERATION.equal) {
      this.evaluateDigitsAndOperations(this.state.currentTotal);
    } else {
      this.recordOperation(operation);
    }
  }

  recordOperation(operation) {
    if (this.$total.isClean()) {
      alert(MESSAGE.pleaseEnterNumberBeforeOperation);
    } else if (validator.isOperation(this.state.lastClickedButton)) {
      alert(MESSAGE.operationCannotBeEnteredConsecutively);
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + operation,
        numberCount: INIT_STATE.numberCount,
        lastClickedButton: operation,
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
        lastClickedButton: digit,
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
      executor[operation](Number(acc), Number(cur)),
    );
    this.setState({
      currentTotal: evaluationResult,
      numberCount: String(evaluationResult).length,
      lastClickedButton: INIT_STATE.lastClickedButton,
    });
  }
}

export default App;
