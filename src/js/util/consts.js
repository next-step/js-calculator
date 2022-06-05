export const selector = (tag) => document.querySelector(tag);
export const selectorAll = (tag) => document.querySelectorAll(tag);

export const LIMIT_NUMBER = 3;
export const INIT_NUMBER = '0';

export const DIGIT = {
  ENTER_MORE_THAN_THOUSAND_ERROR: `숫자는 ${LIMIT_NUMBER}자리까지 입력 가능합니다.`,
};

export const OPERATION = {
  PRESS_IN_A_ROW_ERROR: '연산자를 연속해서 누를 수 없습니다.',
  EQUAL_VALIDATION_ERROR: '"=" 연산자는 다른 연산자를 입력한 후 입력하세요.',
};
