import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';

import { OPERATORS } from './utils/constants.js';

import CalculatorModel from './model/CalculatorModel.js';
import CalculatorObserver from './observer/CalculatorObserver.js';

class App {
  // Dom target
  #target;

  // State
  #state;

  // Components
  #totalPad;
  #digitSection;
  #modifiersSection;
  #operationSection;

  constructor($target) {
    this.#target = $target;

    this.initState();
    this.initCalculator();
    this.initComponents();
  }

  initState() {
    this.model = new CalculatorModel();
    this.#state = this.model.state;
  }

  initCalculator() {
    this.$calculator = document.createElement('div');
    this.$calculator.className = 'calculator';
    this.#target.appendChild(this.$calculator);
  }

  initComponents() {
    this.#totalPad = new TotalPad(this.$calculator);
    this.model.addObserver(new CalculatorObserver(this.#totalPad));

  this.#digitSection = DigitSection(this.$calculator, {
    onClick: this.model.eventHandler.DIGIT,
  });

  this.#modifiersSection = ModifiersSection(this.$calculator, {
    onClick: this.model.eventHandler.MODIFIER,
  });

  this.#operationSection = OperationSection(this.$calculator, {
    OPERATORS,
    onClick: this.model.eventHandler.OPERATION,
  });
  }
}

const $app = document.querySelector('#app');
new App($app);
