import { handleClickDigits, handleClickModifiers, handleClickOperations } from './eventHandlers.js';
import { $ } from './utils/dom.js';

const getDomElement = () => {
  const $digits = $('div.digits');
  const $modifiers = $('div.modifiers');
  const $operations = $('div.operations');

  return {
    $digits,
    $modifiers,
    $operations,
  };
};

const bindEvents = () => {
  getDomElement().$digits.addEventListener('click', handleClickDigits);
  getDomElement().$operations.addEventListener('click', handleClickOperations);
  getDomElement().$modifiers.addEventListener('click', handleClickModifiers);
};

bindEvents();
