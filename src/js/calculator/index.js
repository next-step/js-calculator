import {isDigit, calMapper, isDigitValid, hasOperation, parseTotal} from './helper.js';

const resetTotal = ($total) => {
	$total.innerHTML = '0';
};

const appendDigitToTotal = ($total, value) => {
	if (!isDigitValid($total)) {
		alert('숫자는 최대 3자리수만 입력 가능합니다.');
		return;
	}
	const {a, operation, b} = parseTotal($total);
	if (b == '0') {
		$total.innerHTML = a + operation + value;
		return;
	}
	$total.innerHTML += value;
};
const appendOperatorToTotal = ($total, value) => {
	if (hasOperation($total)) {
		alert('한 번에 하나의 연산만 할 수 있습니다.');
		return false;
	}
	$total.innerHTML += value;
};

const calculate = ($total) => {
	if (!hasOperation($total)) return false;
	const {a, operation, b} = parseTotal($total);

	const result = calMapper[operation](parseInt(a), parseInt(b));
	$total.innerHTML = isFinite(result) ? parseInt(result) : result;
};

export default {
	calculate,
	appendDigitToTotal,
	appendOperatorToTotal,
	resetTotal,
};
