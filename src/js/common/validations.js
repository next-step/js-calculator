import {
    MAX_LENGTH_MESSAGE,
    OPERAND_FIRST_MESSAGE,
    ONLY_TWO_OPERAND_MESSAGE,
} from './constants.js';

/**
 * @param {string} num
 * @returns {boolean} 길이가 3 이상 이라면 true 2 이하라면 false
 */
export function isMaxLength(num) {
    if (num.length >= 3) {
        alert(MAX_LENGTH_MESSAGE);
        return true;
    }
    return false;
}

/**
 * @param {string} operand
 * @returns {boolean} operand이 '0'이면 true 아니라면 false
 */
export function isOperandFirst(operand) {
    if (operand === '0') {
        alert(OPERAND_FIRST_MESSAGE);
        return true;
    }
    return false;
}

/**
 * @param {string | null} operand
 * @returns {boolean} operand가 null이 아니라면 true null이라면 false
 */
export function isOperandFull(operand) {
    if (operand) {
        alert(ONLY_TWO_OPERAND_MESSAGE);
        return true;
    }
    return false;
}
