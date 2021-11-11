import {OPERATOR, OPERATOR_TEXT} from '../consts/operator.js';

export function calculateDisplayText({prevNumber, operator, nextNumber}) {
    if (!operator) {
        return prevNumber;
    }

    if (!nextNumber && nextNumber != 0) {
        return `${prevNumber}${OPERATOR_TEXT[operator]}`;
    }

    return `${prevNumber}${OPERATOR_TEXT[operator]}${nextNumber}`;
}

const calculateFn = {
    [OPERATOR.PLUS]: (a, b) => a + b,
    [OPERATOR.MINUS]: (a, b) => a - b,
    [OPERATOR.MULTIPLE]: (a, b) => a * b,
    [OPERATOR.DIVIDE]: (a, b) => Math.floor(a / b),
};

export function calculateNumber({prevNumber, operator, nextNumber}) {
    if (!operator) {
        return prevNumber;
    }

    if (!nextNumber && nextNumber != 0) {
        return prevNumber;
    }

    return calculateFn[operator](prevNumber, nextNumber);
}

export const MAX_SIZE_OF_DIGITS = 3;

export function isValidSizeOfDigits({number}) {
    return String(number).length <= MAX_SIZE_OF_DIGITS;
}
