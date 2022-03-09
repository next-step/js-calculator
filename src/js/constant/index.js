export const DIGIT_MAX_LENGTH = 3;
export const INIT_DIGIT = "0";

export const MESSAGE = Object.freeze({
    ERROR: Object.freeze({
        DIGIT_OVER: `숫자는 ${DIGIT_MAX_LENGTH}자리까지만 입력 가능합니다!`,
        OPERATOR_OVER: "숫자를 먼저 입력한 후 연산자를 입력해주세요!",
        EXIST_OPERATION: "이미 연산자가 존재합니다!"
    })
});

export const SELECTORS = Object.freeze({
    CLASS: Object.freeze({
        CALCULATOR: ".calculator",
        DIGIT: ".digit",
        DIGITS: ".digits",
        MODIFIER: ".modifier",
        MODIFIERS: ".modifiers",
        OPERATION: ".operation",
        OPERATIONS: ".operations"
    }),
    ID:  Object.freeze({
        TOTAL: "#total"
    })
});

export const PLUS = "+";
export const MINUS = "-";
export const DIVISION = "/";
export const MULTIPLICATION = "X";
export const EQUAL = "=";

export const OPERATORS = [PLUS, MINUS, DIVISION, MULTIPLICATION];
export const CALCULATOR = Object.freeze({
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => Math.floor(a / b),
});
