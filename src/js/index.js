import App from './App.js';
import { $digits, $ac, $operations } from './util/dom.js';

const Calculator = new App();

$ac.addEventListener('click', Calculator.allClear.bind(Calculator));

$digits.addEventListener('click', Calculator.setNumber.bind(Calculator));

$operations.addEventListener('click', Calculator.setOperator.bind(Calculator));
