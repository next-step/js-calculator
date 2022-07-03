const MAX_OPERATOR_LENGTH = 2;
const MAX_NUMBER_LENGTH = 3;
const SPLIT_NUMBER_ARRAY_LENGTH = 3;

const OPERATORS = {
  plus: '+',
  minus: '-',
  multiplication: 'X',
  divide: '/',
  equal: '=',
};

const { plus, minus, multiplication, divide } = OPERATORS;
const EXCEPT_EQUAL_OPERATORS_ARRAY = [plus, minus, multiplication, divide];

const AFTER_ENTER_NUMBER_FIRST = '숫자를 먼저 입력한 후 연산자를 입력해주세요!';
const LENGTH_LIMIT_TEXT = '숫자는 세 자리까지만 입력 가능합니다!';
const LENGTH_LIMIT_OPERATOR = '2개의 숫자에 대해서만 연산이 가능합니다!';

export {
  OPERATORS,
  MAX_OPERATOR_LENGTH,
  MAX_NUMBER_LENGTH,
  SPLIT_NUMBER_ARRAY_LENGTH,
  LENGTH_LIMIT_TEXT,
  LENGTH_LIMIT_OPERATOR,
  AFTER_ENTER_NUMBER_FIRST,
  EXCEPT_EQUAL_OPERATORS_ARRAY,
};
