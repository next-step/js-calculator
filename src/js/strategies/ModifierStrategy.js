import { defaultState } from '../Calculator.js';

class ModifierStrategy {
  static mutateState($target, state) {
    return defaultState;
  }
}

export default ModifierStrategy;
