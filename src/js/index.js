import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';


class App {
  #target;
  #state = {};

  constructor($target) {
    this.#target = $target;

    const $calculator = document.createElement('div');
    $calculator.className = 'calculator';

    new TotalPad($calculator);

    new DigitSection($calculator);

    new ModifiersSection($calculator);

    new OperationSection($calculator);

    this.#target.appendChild($calculator);
  }
}

const $app = document.querySelector('#app');
new App($app);
