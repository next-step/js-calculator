const MAX_OPERATOR_LENGTH = 2;
const MAX_NUMBER_LENGTH = 3;

const OPERATORS = {
  plus: '+',
  minus: '-',
  multiplication: 'X',
  divide: '/',
  equal: '=',
};

const { plus, minus, multiplication, divide } = OPERATORS;
const EXCEPT_EQUAL_OPERATORS_ARRAY = [plus, minus, multiplication, divide];

const LENGTH_LIMIT_TEXT = '숫자는 세 자리까지만 입력 가능합니다!';
const LENGTH_LIMIT_OPERATOR = '2개의 숫자에 대해서만 연산이 가능합니다!';

export {
  OPERATORS,
  MAX_OPERATOR_LENGTH,
  MAX_NUMBER_LENGTH,
  LENGTH_LIMIT_TEXT,
  LENGTH_LIMIT_OPERATOR,
  EXCEPT_EQUAL_OPERATORS_ARRAY,
};
