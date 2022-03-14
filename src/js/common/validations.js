import { MESSAGE } from './constants.js';

/**
 * @param {string} num
 * @param {number} maxLength
 * @returns {boolean} 길이가 maxLength 이상 이라면 true / maxLength 이하라면 false
 */
export function isMaxLength(num, maxLength) {
    const invalid = num.length >= maxLength;

    if (invalid) {
        alert(MESSAGE.MAX_LENGTH);
    }

    return invalid;
}

/**
 * @param {string} operand
 * @returns {boolean} operand가 '0'이면 true 아니라면 false
 */
export function isOperandFirst(operand) {
    const invalid = operand === '0';

    if (invalid) {
        alert(MESSAGE.OPERAND_FIRST);
    }

    return invalid;
}

/**
 * @param {string | null} operand
 * @returns {boolean} operand가 null이 아니라면 true null이라면 false
 */
export function isOperandFull(operand) {
    if (operand) {
        alert(MESSAGE.ONLY_TWO_OPERAND);
    }

    return Boolean(operand);
}
