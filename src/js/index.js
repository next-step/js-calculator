import TotalPad from './components/TotalPad.js';
import DigitSection from './components/DigitSection.js';
import ModifiersSection from './components/ModifiersSection.js';
import OperationSection from './components/OperationSection.js';

import { OPERATORS } from './utils/constants.js';

import CalculatorModel from './model/CalculatorModel.js';
import CalculatorObserver from './observer/CalculatorObserver.js';

function App($target) {
  const model = new CalculatorModel();
  const $calculator = document.createElement('div');

  const initCalculator = () => {
    $calculator.className = 'calculator';
    $target.appendChild($calculator);
  };

  const initComponents = () => {
    const $totalPad = new TotalPad($calculator);
    model.addObserver(new CalculatorObserver($totalPad));
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
  };

  initCalculator();
  initComponents();
}


const $app = document.querySelector('#app');
new App($app);
