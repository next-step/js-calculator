export const OPERATION = {
  PLUS: 'PLUS',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  RESULT: 'RESULT',
};

export const STRATEGY = {
  DIGIT: 'DIGIT',
  MODIFIER: 'MODIFIER',
  OPERATOR: 'OPERATOR',
};

export const MUTATE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  OPERATOR: 'OPERATOR',
};

export const ACTION = {
  RESET_ALL: 'RESET_ALL',
};

export const ERROR_MSG = {
  PLZ_SELECT_NUMBER: '숫자를 입력하세요.',
  PLZ_CHECK_MAX_NUMBER: '최대 3자리 수까지 입력 가능합니다.',
  PLZ_CHECK_OPERATOR: '두 개의 숫자 연산만 가능합니다.',
  PLZ_SELECT_OPERATOR: '연산자를 선택하세요.',
};

export const MAX_DIGIT_SIZE = 3;
