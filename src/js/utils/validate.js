import { OPERATION } from '../constants.js';

export const isOperation = value =>
  value === OPERATION.plus ||
  value === OPERATION.minus ||
  value === OPERATION.multiple ||
  value === OPERATION.division;
