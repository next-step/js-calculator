import { ERROR_MESSAGE } from './constants.js';

export function qs(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return scope.querySelector(selector);
}

export function qsAll(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return Array.from(scope.querySelectorAll(selector));
}

export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
}
