// 정규표현식
export const OPERATORS_SET = new Set(['+', '-', 'X', '/']);
export const REGEXP_OPERATOR = /(?<=\d)([+\-X/])/g;
export const REGEXP_DIGIT = /\d/;

// 제한
export const MAX_LENGTH = 3;
// 최대 3글자
export const INVALID_LENGTH = `숫자는 ${MAX_LENGTH}자리까지만 입력 가능합니다!`;
// 피연산자 필요(연속된 연산자)
export const REQUIRED_DIGIT = '숫자를 먼저 입력한 후 연산자를 입력해주세요!';

// 연산자
export const OPERATOR_ADD = '+';
export const OPERATOR_SUB = '-';
export const OPERATOR_MUL = 'X';
export const OPERATOR_DIV = '/';
export const OPERATOR_EQU = '=';
export const OPERATOR_AC = 'AC';
export const OPERATOR_ZERO = '0';
