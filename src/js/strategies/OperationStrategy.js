import { ERROR_MSG, OPERATION } from '../const/index.js';
import { operateCurry } from '../core/index.js';
import { isNull } from '../utils/common.js';

const operationMapping = {
  '/': OPERATION.DIVIDE,
  X: OPERATION.MULTIPLY,
  '+': OPERATION.PLUS,
  '-': OPERATION.SUBTRACT,
  '=': OPERATION.RESULT,
};

const validate = (state, isResultOperator) => {
  if (isNull(state.x)) throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

  if (isNull(state.y) && isResultOperator)
    throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

  if (!isNull(state.y) && !isResultOperator)
    throw new Error(ERROR_MSG.PLZ_CHECK_OPERATOR);
};

const calculate = (state) => {
  const operate = operateCurry(operationMapping[state.operator]);
  state.x = Math.floor(operate(state));
  state.operator = null;
  state.y = null;
};

const mutateOperator = (state, displayOperator) => {
  state.operator = displayOperator;
};

const mutateState = ($target, state) => {
  const displayOperator = $target.dataset.value;
  const isResultOperator =
    operationMapping[displayOperator] === OPERATION.RESULT;

  validate(state, isResultOperator);
  isResultOperator ? calculate(state) : mutateOperator(state, displayOperator);

  return state;
};

export default mutateState;
