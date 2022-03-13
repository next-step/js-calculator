import {
	ALERT_MAX_NUMBER_LENGTH_MESSAGE,
	MAX_NUMBER_LENGTH,
	OPERATIONS,
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
		formula: [],
		result: 0,
	},
	{
		set: (target, key, value) => {
			if (!(key in target)) {
				return false;
			}

			target[key] = value;

			if (key === 'formula') {
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
	const lastInput = state.formula.at(-1);

	if (!lastInput || isOperation(lastInput)) {
		state.formula = [...state.formula, digit];
		return;
	}

	if (lastInput.length >= MAX_NUMBER_LENGTH) {
		alert(ALERT_MAX_NUMBER_LENGTH_MESSAGE);
		return;
	}

	state.formula = [...state.formula.slice(0, -1), lastInput + digit];
};

/**
 * @param {string} modifier
 */
const applyModifier = (modifier) => {
	if (modifier === MODIFIERS.allClear) {
		state.result = 0;
		state.formula = [];
		return;
	}
};

/**
 * @param {string} operation
 */
const inputOperation = (operation) => {
	if (operation === OPERATIONS.eq) {
		if (!state.formula.length) {
			return;
		}

		state.result = calculate(state.formula);
		state.formula = [];
		return;
	}

	if (state.formula.length === 0) {
		state.formula = [state.result, operation];
		return;
	}

	state.formula = [...state.formula, operation];
};

/**
 * @param {any} value
 * @returns boolean
 */
const isOperation = (value) => Object.values(OPERATIONS).includes(value);

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
 * @param {string[]} formula
 */
const calculate = (formula) => {
	const formulaString = formula.join('').replaceAll(OPERATIONS.mul, '*');
	const calculator = new Function('return ' + formulaString);

	return Math.trunc(calculator());
};

/**
 * @param {string[]} formula
 */
const findLastNumber = (formula) => {
	return [...formula].reverse().find((value) => !isOperation(value));
};
