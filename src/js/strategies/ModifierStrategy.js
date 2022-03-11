import { defaultState } from '../index.js';

class ModifierStrategy {
  static mutateState($target, state) {
    return defaultState;
  }
}

export default ModifierStrategy;
