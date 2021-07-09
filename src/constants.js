// 숫자 버튼 클래스 이름
const DIGIT = 'digit';
// 연산자 버튼 클래스 이름
const OPERATION = 'operation';
// AC 버튼 클래스 이름
const MODIFIER = 'modifier';

//숫자 3개 이상 입력 금지
const MAX_DIGIT_LENGTH = '3';
//초기 숫자 0
const INITAL_VALUE = '0';

//연산자들
const EQUAL = '=';
const PLUS = '+';
const MINUS = '-';
const DIVISION = '/';
const MULTI = 'X';
const OPERANDS = [PLUS, MINUS, DIVISION, MULTI];

//오류 메세지
const INVAILD_DIGIT_LENGTH = `숫자는 ${MAX_DIGIT_LENGTH}자리까지만 입력 가능합니다!`;
const INVAILD_OPERATION = `숫자를 먼저 입력한 후 연산자를 입력해주세요!`;

const BUTTON = {
  DIGIT,
  OPERATION,
  MODIFIER,
};

const RESTRICTIONS = {
  MAX_DIGIT_LENGTH,
  INITAL_VALUE,
};

const OPERRATORS = {
  EQUAL,
  PLUS,
  MINUS,
  DIVISION,
  MULTI,
  OPERANDS,
};

const ERROR_MESSEAGE = {
  INVAILD_DIGIT_LENGTH,
  INVAILD_OPERATION,
};

export { BUTTON, RESTRICTIONS, OPERRATORS, ERROR_MESSEAGE };
