import { RESULT_MODIFIER } from '../constants.js';
export const divideOperatorAndNumber = (text) => {
  if (text.includes('+')) {
    const [a, b] = text.split('+');
    return [a, b, '+'];
  }
  if (text.includes('-')) {
    const [a, b] = text.split('-');
    return [a, b, '-'];
  }
  if (text.includes('X')) {
    const [a, b] = text.split('X');
    return [a, b, 'X'];
  }
  if (text.includes('/')) {
    const [a, b] = text.split('/');
    return [a, b, '/'];
  }
  return [text, '', ''];
};

export const makeOnOperatorConditions = ({ state, typedOperator }) => {
  const OVER_TWO_OPERATOR_CONDITION =
    state.operator && typedOperator !== RESULT_MODIFIER;

  const MAKE_RESULT_CONDITION =
    state.operator && state.sum && typedOperator === RESULT_MODIFIER;

  const NO_OPERATOR_WITH_NUMBER =
    !state.operator && state.sum && typedOperator !== RESULT_MODIFIER;

  return {
    OVER_TWO_OPERATOR_CONDITION,
    MAKE_RESULT_CONDITION,
    NO_OPERATOR_WITH_NUMBER,
  };
};
