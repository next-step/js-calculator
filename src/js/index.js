const $total = document.querySelector('#total'),
	$digits = document.querySelector('.digits'),
	$modifier = document.querySelector('.modifier'),
	$operations = document.querySelector('.operations');

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiple = (a, b) => a * b;
const divide = (a, b) => parseInt(a / b);

const calMapper = {
	x: multiple,
	X: multiple,
	'-': substract,
	'+': add,
	'/': divide,
};

const resetTotal = ($total) => {
	$total.innerHTML = '0';
};
const hasOperation = ($total) => {
	return /[\/X\-\+]/i.test($total.innerHTML);
};
const parseTotal = ($total) => {
	if (!hasOperation($total)) {
		return { a: '', operation: '', b: $total.innerHTML };
	}
	const operation = $total.innerHTML.match(/[\/X\-\+]/i)[0];
	const [a, b] = $total.innerHTML.split(/[\/X\-\+]/i);
	return { a, operation, b };
};

const addTotal = ($total, value) => {
	const { a, operation, b } = parseTotal($total);
	if (b === '0') {
		$total.innerHTML = a + operation + value;
		return;
	}
	$total.innerHTML += value;
};
const isDigitValid = ($total) => {
	const { b } = parseTotal($total);
	return !b || b.length < 3;
};
const calculate = ($total) => {
	const { a, operation, b } = parseTotal($total);
	$total.innerHTML = calMapper[operation](parseInt(a), parseInt(b)).toString();
};

const onClickOperation = ({ target }) => {
	const btn = target.closest('.operation');
	if (!btn) return;
	if (btn.innerHTML === '=') {
		if (!hasOperation($total)) return false;

		calculate($total);
	} else {
		if (hasOperation($total)) {
			alert('한 번에 하나의 연산만 할 수 있습니다.');
			return false;
		}
		addTotal($total, target.innerHTML);
	}
};
const onClickDigit = ({ target }) => {
	const digit = target.closest('.digit');
	if (!digit) return;
	if (!isDigitValid($total)) {
		alert('숫자는 최대 3자리수만 입력 가능합니다.');
		return;
	}
	addTotal($total, target.innerHTML);
};

const onClickAC = () => {
	resetTotal($total);
};

$modifier.addEventListener('click', onClickAC);
$digits.addEventListener('click', onClickDigit);
$operations.addEventListener('click', onClickOperation);
