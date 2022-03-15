import {
	ALERT_MAX_NUMBER_LENGTH_MESSAGE,
	MAX_NUMBER_LENGTH,
	OPERATORS,
	MODIFIERS,
} from './constants/index.js';

const $calculator = document.querySelector('.calculator');
const $display = document.querySelector('#total');

$calculator.addEventListener('click', (event) => {
	if (!isHTMLElement(event.target)) {
		return;
	}

	if (isDigitButton(event.target)) {
		inputDigit(event.target.innerText);
		return;
	}

	if (isModifierButton(event.target)) {
		applyModifier(event.target.innerText);
		return;
	}

	if (isOperationButton(event.target)) {
		inputOperation(event.target.innerText);
		return;
	}
});

const state = new Proxy(
	{
		expression: [],
		result: 0,
	},
	{
		set: (target, key, value) => {
			if (!(key in target)) {
				return false;
			}

			target[key] = value;

			if (key === 'expression') {
				$display.innerText = findLastNumber(value) ?? target.result;
			}

			return true;
		},
	},
);

/**
 * @param {string} digit
 */
const inputDigit = (digit) => {
	const lastInput = state.expression.at(-1);

	if (!lastInput || isOperator(lastInput)) {
		state.expression = [...state.expression, digit];
		return;
	}

	if (lastInput.length >= MAX_NUMBER_LENGTH) {
		alert(ALERT_MAX_NUMBER_LENGTH_MESSAGE);
		return;
	}

	state.expression = [...state.expression.slice(0, -1), lastInput + digit];
};

/**
 * @param {string} modifier
 */
const applyModifier = (modifier) => {
	if (modifier === MODIFIERS.ALL_CLEAR) {
		state.result = 0;
		state.expression = [];
		return;
	}
};

/**
 * @param {string} operation
 */
const inputOperation = (operation) => {
	if (operation === OPERATORS.EQUALS) {
		if (!state.expression.length) {
			return;
		}

		state.result = calculate(state.expression);
		state.expression = [];
		return;
	}

	if (state.expression.length === 0) {
		state.expression = [state.result, operation];
		return;
	}

	state.expression = [...state.expression, operation];
};

/**
 * @param {any} value
 * @returns boolean
 */
const isOperator = (value) => Object.values(OPERATORS).includes(value);

/**
 * @param {any} element
 * @returns boolean
 */
const isHTMLElement = (element) => element instanceof HTMLElement;

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isDigitButton = (element) => element.classList.contains('digit');

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isModifierButton = (element) => element.classList.contains('modifier');

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isOperationButton = (element) => element.classList.contains('operation');

/**
 * @param {string[]} expression
 */
const calculate = (expression) => {
	const expressionString = expression
		.join('')
		.replaceAll(OPERATORS.MULTIPLICATION, '*');
	const calculator = new Function('return ' + expressionString);

	return Math.trunc(calculator());
};

/**
 * @param {string[]} expression
 */
const findLastNumber = (expression) => {
	return [...expression].reverse().find((value) => !isOperator(value));
};
