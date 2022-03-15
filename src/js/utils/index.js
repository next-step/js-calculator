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

export const extractor = {
  operation: expression => {
    if (expression.includes(OPERATION.plus)) return OPERATION.plus;
    if (expression.includes(OPERATION.minus)) return OPERATION.minus;
    if (expression.includes(OPERATION.multiple)) return OPERATION.multiple;
    if (expression.includes(OPERATION.division)) return OPERATION.division;
    return false;
  },
};
