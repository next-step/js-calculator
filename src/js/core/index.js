import { OPERATION } from '../const/index.js';

const operateCommand = {
  [OPERATION.PLUS]: (x, y) => x + y,
  [OPERATION.SUBTRACT]: (x, y) => x - y,
  [OPERATION.MULTIPLY]: (x, y) => x * y,
  [OPERATION.DIVIDE]: (x, y) => x / y,
};

export const operateCurry =
  (operator) =>
  ({ x, y }) =>
    operateCommand[operator](x, y);
