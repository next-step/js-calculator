import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import Modifiers from './components/Modifiers.js';
import { $ } from './utils/dom.js';
import { isOperation } from './utils/validate.js';

class App {
  constructor(target) {
    this.$target = $(target);
    this.state = {
      currentTotal: '0',
      numberCount: 0,
    };
    this.$digits = new Digits($('.digits'), this.onClickButtons.bind(this));
    this.$operations = new Operations($('.operations'), this.onClickButtons.bind(this));
    this.$modifiers = new Modifiers($('.modifiers'), this.onClickButtons.bind(this));
    this.$total = new Total($('#total'), this.state.currentTotal);
  }

  setState(nextState) {
    this.state = nextState;
    this.$total.setState(this.state.currentTotal);
  }

  onClickButtons(clickedValue) {
    if (clickedValue === 'AC') {
      this.setState({ currentTotal: '0', numberCount: 0 });
    } else if (clickedValue === '=') {
      this.evaluateDigitsAndOperations(this.state.currentTotal);
    } else if (isOperation(clickedValue)) {
      this.recordOperation(clickedValue);
    } else {
      this.recordDigit(clickedValue);
    }
  }

  recordOperation(operation) {
    if (this.state.currentTotal === '0') {
      alert('연산자 입력 전에 숫자를 입력해주세요.');
    } else {
      this.setState({
        currentTotal: this.state.currentTotal + operation,
        numberCount: 0,
      });
    }
  }

  recordDigit(digit) {
    if (this.state.currentTotal === '0') {
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
    if (expression.includes('+')) return '+';
    if (expression.includes('-')) return '-';
    if (expression.includes('X')) return 'X';
    if (expression.includes('/')) return '/';
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
      case '+':
        return Number(acc) + Number(cur);
      case '-':
        return Number(acc) - Number(cur);
      case 'X':
        return Number(acc) * Number(cur);
      case '/':
        return Math.floor(Number(acc) / Number(cur));
      default:
        return false;
    }
  }
}

export default App;
