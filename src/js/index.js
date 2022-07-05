
import { handleDigitClick, handleModifierClick, handleOperationClick } from './helper/index.js';
import { $ } from './utils/index.js';

function calulateNumber() {
  const js_digits = $('.digits');
  const js_operations = $('.operations');
  const js_modifiers = $('.modifiers');
  
  js_digits.addEventListener('click', handleDigitClick);

  js_operations.addEventListener('click',handleOperationClick);
  
  js_modifiers.addEventListener('click', handleModifierClick);
  
}

calulateNumber();