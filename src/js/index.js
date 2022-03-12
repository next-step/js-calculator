import initCalculator from './Calculator.js';
import { $ } from './utils/domApi.js';

initCalculator({
  $calculator: $('.calculator'),
  $total: $('#total'),
});
