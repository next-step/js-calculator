import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';

import { OPERATORS } from './utils/constants.js';

import CalculatorModel from './model/CalculatorModel.js';

function App($target) {
  const model = new CalculatorModel();
  const $calculator = document.createElement('div');

  const initCalculator = () => {
    $calculator.className = 'calculator';
    $target.appendChild($calculator);
  };

  const initComponents = () => {
    DigitSection($calculator, {
      onClick: model.eventHandler.DIGIT,
    });

    ModifiersSection($calculator, {
      onClick: model.eventHandler.MODIFIER,
    });

    OperationSection($calculator, {
      OPERATORS,
      onClick: model.eventHandler.OPERATION,
    });

    new TotalPad($calculator);
  };

  initCalculator();
  initComponents();
}

const $app = document.querySelector('#app');
App($app);
