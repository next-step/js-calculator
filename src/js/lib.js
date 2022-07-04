export function selector(target) {
  return document.querySelector(target);
}

export function mergeState(state) {
  return [...state].reduce((cur, sum) => cur += sum, '');
}

export const operatorRegex = /X|\/|\-|\+/;

export const findOperator = (state) => state.find(c => operatorRegex.test(c));