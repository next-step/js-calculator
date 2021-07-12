import {
	INIT_TOTAL,
	MAX_SIZE_DIGIT_INPUT_MESSAGE,
	CALCULATE_ONE_AT_ONCE_MESSAGE,
} from './constant.js';
import {isDigit, calMapper, isDigitValid, hasOperation, parseTotal} from './helper.js';

const resetTotal = ($total) => {
	$total.innerHTML = INIT_TOTAL;
};

const appendDigitToTotal = ($total, value) => {
	if (!isDigitValid($total)) {
		alert(MAX_SIZE_DIGIT_INPUT_MESSAGE);
		return;
	}
	const {a, operation, b} = parseTotal($total);
	if (b == INIT_TOTAL) {
		$total.innerHTML = a + operation + value;
		return;
	}
	$total.innerHTML += value;
};
const appendOperatorToTotal = ($total, value) => {
	if (hasOperation($total)) {
		alert(CALCULATE_ONE_AT_ONCE_MESSAGE);
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
