import { OPERATION } from '../constants.js';

export const executor = {
  [OPERATION.plus]: (left, right) => left + right,
  [OPERATION.minus]: (left, right) => left - right,
  [OPERATION.multiple]: (left, right) => left * right,
  [OPERATION.division]: (left, right) => Math.floor(left / right),
};

export const validator = {
  isOperation: value =>
    value === OPERATION.plus ||
    value === OPERATION.minus ||
    value === OPERATION.multiple ||
    value === OPERATION.division,
};
