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

  onClickButtons(value) {
    this.state.currentTotal =
      this.state.currentTotal === '0' ? value : this.state.currentTotal + value;
    this.$total.setState(this.state.currentTotal);
  }
}

export default App;
