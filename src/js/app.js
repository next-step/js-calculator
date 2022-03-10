import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import { $ } from './utils/dom.js';

class App {
  constructor(target) {
    this.$target = $(target);
    this.state = {
      currentTotal: '0',
    };
    this.$digits = new Digits($('.digits'), this.onClickButtons.bind(this));
    this.$operations = new Operations($('.operations'), this.onClickButtons.bind(this));
    this.$total = new Total($('#total'), this.state.currentTotal);
  }

  setState(nextState) {
    this.state = nextState;
    this.$total.setState(this.state.currentTotal);
  }

  onClickButtons(clickedValue) {
    if (clickedValue === '=') {
      this.evaluateDigitsAndOperations(this.state.currentTotal);
    } else {
      this.recordDigitsAndOperations(clickedValue);
    }
  }

  recordDigitsAndOperations(clickedValue) {
    if (this.state.currentTotal === '0') {
      this.setState({ currentTotal: clickedValue });
    } else {
      this.setState({ currentTotal: this.state.currentTotal + clickedValue });
    }
  }

  evaluateDigitsAndOperations(digitsAndOperations) {
    if (digitsAndOperations.includes('+')) {
      const bothSidesOfPlus = digitsAndOperations.split('+');
      const evaluationResult = bothSidesOfPlus.reduce((acc, cur) => Number(acc) + Number(cur));
      this.setState({ currentTotal: evaluationResult });
    } else if (digitsAndOperations.includes('-')) {
      const bothSidesOfMinus = digitsAndOperations.split('-');
      const evaluationResult = bothSidesOfMinus.reduce((acc, cur) => Number(acc) - Number(cur));
      this.setState({ currentTotal: evaluationResult });
    }
    // else if (digitsAndOperations.includes('X')) {
    // }
    // else if (digitsAndOperations.includes('/')) {
    // }
  }
}

export default App;
