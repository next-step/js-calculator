export const MESSAGE = {
    OPERAND_FIRST: '숫자를 먼저 입력한 후 연산자를 입력해주세요!',
    MAX_LENGTH: '숫자는 세 자리까지만 입력 가능합니다!',
    ONLY_TWO_OPERAND: '2개의 숫자 조합만 계산 가능합니다!',
};

export const OPERATIONS = {
    PLUS: '+',
    MINUS: '-',
    DIVIDE: '/',
    MULTIPLE: 'X',
    CALCULATE: '=',
};

export const CALCULATE = {
    [OPERATIONS.PLUS]: (a, b) => +a + +b,
    [OPERATIONS.MINUS]: (a, b) => +a - +b,
    [OPERATIONS.MULTIPLE]: (a, b) => +a * +b,
    [OPERATIONS.DIVIDE]: (a, b) => Math.floor(+a / +b),
};
