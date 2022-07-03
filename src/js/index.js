import { $, $$, addEvent } from './util.js';
import { paintToDOM } from './view.js';
import { DIGIT, DIGIT_WRAPPER, MODIFIER, OPERATION, OPERATION_WRAPPER, TOTAL } from './selectors.js';
import { NUMBER_LENGTH_ALERT_MSG } from '../constants.js';
import { store } from './store/calculator-store.js';
import { add, minus, multiply, divide } from './calculate.js';
import { setNumberA, setNumberB, setOperation, setTotal, resetAll } from './action/calculator-actions.js';
/* 
	필요한 함수들 정의
	정의 후 각 파일로 모듈화 할 생각입니다.
*/

const isInputLengthValid = function (inputLength) {
	const MAX_LENGTH = 3;
	return inputLength < MAX_LENGTH;
};

const resetCalcultaor = () => {
	const INITIAL_TOTAL_NUM = '0';
	store.dispatch(resetAll());
	paintToDOM($(TOTAL), INITIAL_TOTAL_NUM);
};

const saveNumberToStore = function (value) {
	const { numberA, numberB, operation } = store.getState();
	if (operation) {
		store.dispatch(setNumberB(numberB + value));
	} else {
		store.dispatch(setNumberA(numberA + value));
	}
};

const onClickDigit = function (ev) {
	const clickedValue = ev.target.dataset.digitNumber;
	saveNumberToStore(clickedValue);
};

const onClickOperation = function (ev) {
	const { numberA, numberB } = store.getState();
	if (!numberA && !numberB) return;
	const clickedOperation = ev.target.dataset.operationRole;
	if (clickedOperation === '=') {
		setTotalValue(store.getState().operation);
	}
	store.dispatch(setOperation(clickedOperation));
};

const setTotalValue = function (operation) {
	const { numberA, numberB } = store.getState();
	switch (operation) {
		case '+':
			store.dispatch(setTotal(add(numberA, numberB)));
			break;
		case '-':
			store.dispatch(setTotal(minus(numberA, numberB)));
			break;
		case 'X':
			store.dispatch(setTotal(multiply(numberA, numberB)));
			break;
		case '/':
			store.dispatch(setTotal(divide(numberA, numberB)));
	}
};

const init = function () {
	// 버튼 데이터 초기화
	$$(DIGIT).forEach((el) => (el.dataset.digitNumber = el.innerText));
	$$(OPERATION).forEach((el) => (el.dataset.operationRole = el.innerText));

	// 버튼 별 이벤트 부착
	addEvent($(DIGIT_WRAPPER), 'click', onClickDigit);
	addEvent($(MODIFIER), 'click', resetCalcultaor);
	addEvent($(OPERATION_WRAPPER), 'click', onClickOperation);
};

init();
