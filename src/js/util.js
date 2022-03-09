import { operators } from "./constants.js";

/**
 *
 * @param {'+' | '-' | '*' | '/'} str
 * @returns {boolean}
 */
export const isOperator = (str) => operators.includes(str);
