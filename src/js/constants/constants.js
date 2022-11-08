export const MAX_DIGIT_NUMBER = 3;

export const MESSAGE = {
  INVALID_NUMBER_SIZE: `숫자는 한번에 최대 ${MAX_DIGIT_NUMBER}자리 수까지 입력 가능합니다!`,
};

/** @todo:
 * 가령 연산자가 20개쯤 된다면?
 * 연산자인지 검증하는 로직이 있다면?
 */
export const OPERATOR = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLICATION: "X",
  DIVISION: "/",
  EQUALS: "=",
};
