import { $ } from './util/helper.js';

const $total = $('#total');
const $digits = $('.digits');
const $ac = $('.modifier');
const $operations = $('.operations');

const PLUS_SIGN = '+';
const MINUS_SIGN = '-';
const MULTIPLICATION_SIGN = 'X';
const DIVISION_SIGN = '/';
const EQUAL_SIGN = '=';
const ERROR_MSG = {
	INVALID_VALUE: '값을 입력하세요.',
	INVALID_MAX_LENGTH: '최대 3자리 수까지 입력 가능합니다.',
};

let firstValue = '';
let secondValue = '';
let result = 0;
let operation = '';

const calculate = () => {
	firstValue = Number(firstValue);
	secondValue = Number(secondValue);

	switch (operation) {
		case PLUS_SIGN:
			result = firstValue + secondValue;
			break;
		case MINUS_SIGN:
			result = firstValue - secondValue;
			break;
		case MULTIPLICATION_SIGN:
			result = firstValue * secondValue;
			break;
		case DIVISION_SIGN:
			result = Math.floor(firstValue / secondValue);
			break;
		default:
	}
};

const isValidMaxLength = (value) => {
	if (value.length > 2) {
		return false;
	}

	return true;
};

const render = () => {
	$total.innerText = `${firstValue} ${operation} ${secondValue}`;
	if (operation === EQUAL_SIGN) {
		$total.innerText = `${result}`;
	}
};

$ac.addEventListener('click', (e) => {
	firstValue = '';
	secondValue = '';
	operation = '';
	result = 0;
	$total.innerText = '0';
});

$digits.addEventListener('click', (e) => {
	const digit = e.target.innerText;

	if (operation === '') {
		if (!isValidMaxLength(firstValue)) {
			alert(ERROR_MSG.INVALID_MAX_LENGTH);
			return;
		}
		firstValue += digit;
		render();
		return;
	}

	if (!isValidMaxLength(secondValue)) {
		alert(ERROR_MSG.INVALID_MAX_LENGTH);
		return;
	}
	secondValue += digit;
	render();
});

$operations.addEventListener('click', (e) => {
	if (!firstValue) {
		alert(ERROR_MSG.INVALID_VALUE);
		return;
	}

	if (e.target.innerText === EQUAL_SIGN) {
		calculate();
		render();
	}

	operation = e.target.innerText;
	render();
});
