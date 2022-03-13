import {
	ALERT_MAX_NUMBER_LENGTH_MESSAGE,
	MAX_NUMBER_LENGTH,
} from './constants/index.js';
import {add, subtract, multiply, divide} from './math.js';

const $total = document.getElementById('total');
const $digits = document.querySelector('.digits');
const $modifiers = document.querySelector('.modifiers');
const $operations = document.querySelector('.operations');

const init = () => {
	$digits.addEventListener('click', onClickDigits);
	$operations.addEventListener('click', onClickOperations);
	$modifiers.addEventListener('click', onClickModifiers);
};

let state = {
	result: undefined,
	inputNumber: undefined,
	displayNumber: undefined,
	operation: undefined,
};

const setState = (newState) => {
	state = {
		...state,
		...newState,
	};

	$total.innerText = state.displayNumber ?? 0;
};

const onClickDigits = (event) => {
	const digit = event.target.innerText;
	const inputNumber = inputDigit(state.inputNumber, digit);

	setState({
		inputNumber,
		displayNumber: inputNumber,
	});
};

const onClickOperations = (event) => {
	const operation = event.target.innerText;

	if (operation === '=') {
		if (!state.result) {
			return;
		}

		setState({
			result: undefined,
			inputNumber: undefined,
			displayNumber: calculate({
				left: Number(state.result ?? 0),
				right: Number(state.inputNumber ?? 0),
				operation: state.operation,
			}),
			operation,
		});

		return;
	}

	if (state.result === undefined) {
		setState({
			result: $total.innerText,
			inputNumber: undefined,
			operation,
		});

		return;
	}

	setState({
		operation,
	});
};

const onClickModifiers = (event) => {
	const modifier = event.target.innerText;

	if (modifier === 'AC') {
		setState({
			result: undefined,
			inputNumber: undefined,
			displayNumber: undefined,
			operation: undefined,
		});

		return;
	}
};

/**
 * @param {string | undefined} value
 * @param {string} digit
 * @returns
 */
const inputDigit = (value, digit) => {
	if (!value) {
		return digit;
	}

	if (value.length >= MAX_NUMBER_LENGTH) {
		alert(ALERT_MAX_NUMBER_LENGTH_MESSAGE);
		return value;
	}

	return value.concat(digit);
};

/**
 * @param {{left: number, right: number, operation: string}} formula 수식
 * @returns {number | undefined} 결과값
 */
const calculate = ({left, right, operation}) => {
	if (operation === '+') {
		return add(left, right);
	}

	if (operation === '-') {
		return subtract(left, right);
	}

	if (operation === 'X') {
		return multiply(left, right);
	}

	if (operation === '/') {
		return Math.trunc(divide(left, right));
	}
};

init();
