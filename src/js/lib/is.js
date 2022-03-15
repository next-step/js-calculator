import {OPERATORS} from '../constants/index.js';

/**
 * @param {unknown} value
 * @returns boolean
 */
const isOperator = (value) => Object.values(OPERATORS).includes(value);

/**
 * @param {unknown} value
 * @returns boolean
 */
const isHTMLElement = (value) => value instanceof HTMLElement;

/**
 * @param {unknown} value
 * @returns boolean
 */
const isButton = (value) => isHTMLElement(value) && value.tagName === 'BUTTON';

/**
 * @param {unknown} value
 * @returns {boolean}
 */
const isDigitButton = (value) =>
	isButton(value) && value.classList.contains('digit');

/**
 * @param {unknown} value
 * @returns {boolean}
 */
const isModifierButton = (value) =>
	isButton(value) && value.classList.contains('modifier');

/**
 * @param {unknown} value
 * @returns {boolean}
 */
const isOperatorButton = (value) =>
	isButton(value) && value.classList.contains('operator');

const is = {
	operator: isOperator,
	htmlElement: isHTMLElement,
	button: isButton,
	digitButton: isDigitButton,
	modifierButton: isModifierButton,
	operatorButton: isOperatorButton,
};

export default is;
