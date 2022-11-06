import $ from './utils.js';
import Calculator from './calculator.js';

const calculator = new Calculator({
  $total: $('#total'),
  $digits: $('.digits'),
  $modifier: $('.modifier'),
  $operations: $('.operations'),
});

calculator.initEvents();
