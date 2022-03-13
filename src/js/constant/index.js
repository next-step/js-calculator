export const DIGIT_MAX_LENGTH = 3;
export const INIT_DIGIT = "0";

export const MESSAGE = {
    ERROR: {
        DIGIT_OVER: `숫자는 ${DIGIT_MAX_LENGTH}자리까지만 입력 가능합니다!`,
        OPERATOR_EXIST: `이미 연산자가 존재합니다!`,
    },
};

export const SELECTORS = {
    CLASS: {
        CALCULATOR: ".calculator",
        DIGIT: ".digit",
        DIGITS: ".digits",
        MODIFIER: ".modifier",
        MODIFIERS: ".modifiers",
        OPERATION: ".operation",
        OPERATIONS: ".operations",
    },
    ID: {
        TOTAL: "#total",
    },
};
export const EQUAL = "=";

export const CALCULATOR = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    X: (a, b) => a * b,
    "/": (a, b) => Math.floor(a / b),
};
