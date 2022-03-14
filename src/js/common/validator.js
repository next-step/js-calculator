import { MAX_OPERAND_SIZE, ERROR_MESSAGES, INITIAL_VALUES } from './constants.js';

const operatorValidator = {
  checkAbleOperatorUpdate: (state) => {
    if (
      state.operator !== INITIAL_VALUES.INITIAL_OPERATOR ||
      (state.total === INITIAL_VALUES.INITIAL_TOTAL && state.operand === INITIAL_VALUES.INITIAL_OPERAND)
    ) {
      throw new Error(ERROR_MESSAGES.REQUIRE_OPERAND);
    }
  },
  checkAbleCalculate: (operator) => {
    if (operator !== INITIAL_VALUES.INITIAL_OPERATOR) {
      throw new Error(ERROR_MESSAGES.IMPOSSIBLE_CALCULATE);
    }
  },
  isInitState: (state) =>
    state.operator === INITIAL_VALUES.INITIAL_OPERATOR &&
    state.operand === INITIAL_VALUES.INITIAL_OPERAND &&
    state.total === INITIAL_VALUES.INITIAL_TOTAL,
};

const operandValidtor = {
  checkOperandSize: (operand) => {
    if (operand.length >= MAX_OPERAND_SIZE) {
      throw new Error(ERROR_MESSAGES.LIMIT_OPERAND_SIZE);
    }
  },
  checkImmediateAfterCalulate: (state) => {
    if (
      state.total !== INITIAL_VALUES.INITIAL_TOTAL &&
      state.operand === INITIAL_VALUES.INITIAL_OPERAND &&
      state.operator === INITIAL_VALUES.INITIAL_OPERATOR
    ) {
      throw new Error(ERROR_MESSAGES.REQUIRE_OPERATOR);
    }
  },
};

export const validators = {
  operatorValidator,
  operandValidtor,
};
