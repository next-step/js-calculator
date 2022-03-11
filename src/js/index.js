import initCalculator from './Calculator.js';
import { $ } from './utils/domApi.js';

export const defaultState = {
  x: null,
  operator: null,
  y: null,
};

initCalculator(
  {
    $calculator: $('.calculator'),
    $total: $('#total'),
  },
  defaultState
);
