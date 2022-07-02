
import { handleDigits, handleModifiers, handleOperations } from './modules/index.js';
import { $ } from './utils/index.js';

function Calulator() {
  const digits = $('.digits');
  const operations = $('.operations');
  const modifiers = $('.modifiers');
  
  digits.addEventListener('click', handleDigits);

  operations.addEventListener('click', handleOperations);
  
  modifiers.addEventListener('click', handleModifiers);
  
}

Calulator();