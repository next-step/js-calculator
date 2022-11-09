import { handleClickDigits, handleClickModifiers, handleClickOperations } from './eventHandlers.js';
import { $ } from './utils/dom.js';

const $digits = $('div.digits');
const $modifiers = $('div.modifiers');
const $operations = $('div.operations');

$digits.addEventListener('click', handleClickDigits);

$operations.addEventListener('click', handleClickOperations);

$modifiers.addEventListener('click', handleClickModifiers);
