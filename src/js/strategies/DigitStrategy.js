import { ERROR_MSG, MAX_DIGIT_SIZE } from '../const/index.js';
import { isNull } from '../utils/common.js';

class DigitStrategy {
  static mutateState($target, state) {
    const key = isNull(state.operator) ? 'x' : 'y';

    const currNumber = Number($target.dataset.value);

    const prevNumber = state[key];

    DigitStrategy.#validate(key, currNumber, prevNumber);

    state[key] = prevNumber * 10 + currNumber;

    return state;
  }
  static #validate(key, currNumber, prevNumber) {
    if (key === 'x' && !currNumber)
      throw new Error(ERROR_MSG.PLZ_SELECT_NUMBER);

    const isOverMaxSize = prevNumber?.toString().length >= MAX_DIGIT_SIZE;
    if (isOverMaxSize) throw new Error(ERROR_MSG.PLZ_CHECK_MAX_NUMBER);
  }
}

export default DigitStrategy;
