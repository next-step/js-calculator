import Digits from './components/Digits.js';
import Total from './components/Total.js';
import Operations from './components/Operations.js';
import { $ } from './utils/dom.js';

class App {
  constructor(target) {
    this.$target = $(target);
    this.$digits = new Digits($('.digits'), this.onClickButtons.bind(this));
    this.$operations = new Operations($('.operations'), this.onClickButtons.bind(this));
    this.$total = new Total($('#total'));
  }

  onClickButtons(value) {
    this.$total.recordTotalValue(value);
  }
}

export default App;
