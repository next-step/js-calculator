import { OPERATOR } from '../constants';

export const isOperation = value =>
  value === OPERATOR.plus ||
  value === OPERATOR.minus ||
  value === OPERATOR.multiple ||
  value === OPERATOR.division;
