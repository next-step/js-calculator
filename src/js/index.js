import Calculator from './Calculator.js';
import { $ } from './utils/domApi.js';

new Calculator({
  $calculator: $('.calculator'),
  $total: $('#total'),
});
