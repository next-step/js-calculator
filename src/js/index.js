import Calculator from './calculator';

const {appendDigitToTotal, appendOperatorToTotal, calculate, resetTotal} = Calculator;

const $total = document.querySelector('#total'),
	$digits = document.querySelector('.digits'),
	$modifier = document.querySelector('.modifier'),
	$operations = document.querySelector('.operations');

const onClickOperation = ({target}) => {
	const btn = target.closest('.operation');
	if (!btn) return;
	if (btn.innerHTML === '=') {
		calculate($total);
	} else {
		appendOperatorToTotal($total, target.innerHTML);
	}
};
const onClickDigit = ({target}) => {
	const digit = target.closest('.digit');
	if (!digit) return;
	appendDigitToTotal($total, target.innerHTML);
};

const onClickAC = () => {
	resetTotal($total);
};

$modifier.addEventListener('click', onClickAC);
$digits.addEventListener('click', onClickDigit);
$operations.addEventListener('click', onClickOperation);
