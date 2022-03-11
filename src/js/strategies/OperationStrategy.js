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

class OperationStrategy {
  static mutateState($target, state) {
    const displayOperator = $target.dataset.value;
    const operator = operationMapping[displayOperator];
    const isResultOperator = operator === OPERATION.RESULT;

    OperationStrategy.#validate(state, isResultOperator);

    isResultOperator
      ? OperationStrategy.#calculate(state)
      : OperationStrategy.#mutateOperator(state, displayOperator);

    return state;
  }

  static #calculate(state) {
    const operate = operateCurry(operationMapping[state.operator]);
    state.x = Math.floor(operate(state));
    state.operator = null;
    state.y = null;
  }

  static #mutateOperator(state, displayOperator) {
    state.operator = displayOperator;
  }

  static #validate(state, isResultOperator) {
    if (isNull(state.x)) throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

    if (isNull(state.y) && isResultOperator)
      throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

    if (!isNull(state.y) && !isResultOperator)
      throw new Error(ERROR_MSG.PLZ_CHECK_OPERATOR);
  }
}

export default OperationStrategy;
