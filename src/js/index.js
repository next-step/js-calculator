import { $, $$, addEvent } from './util.js';
import { paintToDOM } from './view.js';
import { DIGIT, DIGIT_WRAPPER, MODIFIER, OPERATION, OPERATION_WRAPPER, TOTAL } from './selectors.js';

/* 
	필요한 함수들 정의
	정의 후 각 파일로 모듈화 할 생각입니다.
*/

const updateTotalValue = function (newValue) {
	const total = $(TOTAL);
	const INITIAL_TOTAL_NUM = '0';
	const currentTotal = total.innerText;
	if ((newValue === INITIAL_TOTAL_NUM && currentTotal === INITIAL_TOTAL_NUM) || !isInputLengthValid(currentTotal.length)) {
		return;
	} else if (currentTotal === INITIAL_TOTAL_NUM) {
		paintToDOM(total, newValue);
	} else {
		paintToDOM(total, total.innerText + newValue);
	}
};

const isInputLengthValid = function (inputLength) {
	const MAX_LENGTH = 3;
	if (inputLength >= MAX_LENGTH) return false;
	return true;
};

const resetTotalToZero = () => {
	const INITIAL_TOTAL_NUM = '0';
	const total = $(TOTAL);
	paintToDOM(total, INITIAL_TOTAL_NUM);
};

// 초기화 IIFE
(() => {
	// 버튼 데이터 초기화
	const digitList = $$(DIGIT);
	const operationList = $$(OPERATION);
	digitList.forEach((el) => (el.dataset.digitNumber = el.innerText));
	operationList.forEach((el) => (el.dataset.operationRole = el.innerText));

	// 버튼 별 이벤트 부착
	const digitsWrapper = $(DIGIT_WRAPPER);
	const modifier = $(MODIFIER);
	addEvent(digitsWrapper, 'click', (ev) => {
		const clickedValue = ev.target.innerText;
		updateTotalValue(clickedValue);
	});
	addEvent(modifier, 'click', resetTotalToZero);
})();
