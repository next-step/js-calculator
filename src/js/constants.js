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

export const OPERATION = {
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
  pleaseEnterNumberBeforeOperation: '연산자 입력 전에 숫자를 입력해주세요.',
  operationCannotBeEnteredConsecutively: '연산자는 연속으로 입력이 불가능합니다.',
  numberCanBeEnteredUpToThreeDigitsAtOnce: '숫자는 한번에 최대 3자리 수까지 입력 가능합니다.',
};
