export const BASE_URL = "http://localhost:8080/";
export const SELECTORS = {
  $operation: ".operation",
  $digit: ".digit",
  $modifier: ".modifier",
  $total: "#total",
};

export const TEXTS = {
  mult: "X",
  sum: "+",
  sub: "-",
  div: "/",
  result: "=",
};

export const ERROR_MESSAGES = {
  DIGIT_OVER_ERROR: "최대 3자리 숫자까지 가능합니다",
  OPERATOR_OVER_ERROR: "숫자를 제대로 입력해주세요",
};
