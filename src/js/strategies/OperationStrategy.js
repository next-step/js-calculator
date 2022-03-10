import { OPERATION } from '../const/index.js';
import { operateCurry } from '../core/index.js';
import { isNull } from '../utils/common.js';

const operationMapping = {
  '/': OPERATION.DIVIDE,
  X: OPERATION.MULTIPLY,
  '+': OPERATION.PLUS,
  '-': OPERATION.SUBTRACT,
  '=': OPERATION.RESULT,
};

const convertToOperationKey = (displayOperator) =>
  operationMapping[displayOperator];

class OperationStrategy {
  static mutateState($target, state) {
    if (isNull(state.x)) throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

    const displayOperator = $target.dataset.value;
    const operator = convertToOperationKey(displayOperator);
    const isResultOperator = operator === OPERATION.RESULT;

    if (!isNull(state.y) && !isResultOperator)
      throw new Error(ERROR_MSG.PLZ_CHECK_OPERATOR);

    isResultOperator
      ? OperationStrategy.#calculate(state)
      : OperationStrategy.#mutateOperator(state, displayOperator);

    return state;
  }

  static #calculate(state) {
    const operate = operateCurry(convertToOperationKey(state.operator));
    state.x = Math.floor(operate(state));
    state.operator = null;
    state.y = null;
  }
  static #mutateOperator(state, displayOperator) {
    state.operator = displayOperator;
  }
}

export default OperationStrategy;
