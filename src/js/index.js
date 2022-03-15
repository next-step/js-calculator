import {
	ALERT_MAX_NUMBER_LENGTH_MESSAGE,
	MAX_NUMBER_LENGTH,
	OPERATORS,
	MODIFIERS,
} from './constants/index.js';
import is from './lib/is.js';

const $calculator = document.querySelector('.calculator');
const $display = document.querySelector('#total');

$calculator.addEventListener('click', ({target}) => {
	if (is.digitButton(target)) {
		inputDigit(target.innerText);
		return;
	}

	if (is.modifierButton(target)) {
		applyModifier(target.innerText);
		return;
	}

	if (is.operatorButton(target)) {
		inputOperator(target.innerText);
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

	if (!lastInput || is.operator(lastInput)) {
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
 * @param {string} operator
 */
const inputOperator = (operator) => {
	if (operator === OPERATORS.EQUALS) {
		inputEqualsOperator();
		return;
	}

	inputArithmeticOperator(operator);
};

const inputEqualsOperator = () => {
	if (state.expression.length > 0) {
		state.result = calculate(state.expression);
		state.expression = [];
	}
};

/**
 * @param {string} operator
 */
const inputArithmeticOperator = (operator) => {
	if (state.expression.length > 0) {
		state.expression = [...state.expression, operator];
		return;
	}

	state.expression = [state.result, operator];
};

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
	return [...expression].reverse().find((value) => !is.operator(value));
};
