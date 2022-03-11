export const DOM = {
  app: '#app',
  total: '#total',
  digits: '.digits',
  digit: '.digit',
  operations: '.operations',
  operation: '.operation',
  modifiers: '.modifiers',
  modifier: '.modifier',
};

export const OPERATOR = {
  plus: '+',
  minus: '-',
  multiple: 'X',
  division: '/',
  equal: '=',
};

export const MODIFIER = {
  allClear: 'AC',
};

export const INIT_STATE = {
  currentTotal: '0',
  numberCount: 0,
};

export const MESSAGE = {
  pleaseEnterNumberBeforeOperator: '연산자 입력 전에 숫자를 입력해주세요.',
  numberCanBeEnteredUpToThreeDigitsAtOnce: '숫자는 한번에 최대 3자리 수까지 입력 가능합니다.',
};
