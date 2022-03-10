import { MAX_DIGIT_SIZE } from '../const/index.js';
import { isNull } from '../utils/common.js';

class DigitStrategy {
  static mutateState($target, state) {
    const key = isNull(state.operator) ? 'x' : 'y';

    const prevNumber = state[key];
    const currNumber = Number($target.dataset.value);

    const isOverMaxSize = prevNumber?.toString().length >= MAX_DIGIT_SIZE;

    if (key === 'x' && !currNumber)
      throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

    if (isOverMaxSize) throw new Error(ERROR_MSG.PLZ_CHECK_MAX_NUMBER);

    state[key] = prevNumber * 10 + currNumber;
    return state;
  }
}

export default DigitStrategy;
