import { $, $$, addEvent } from './util.js';
import { DIGIT, DIGIT_WRAPPER, MODIFIER, OPERATION, OPERATION_WRAPPER } from './selectors.js';
import { onClickDigit, onClickModifier, onClickOperation } from './event.js';

const init = function () {
	// 버튼 데이터 초기화
	$$(DIGIT).forEach((el) => (el.dataset.digitNumber = el.innerText));
	$$(OPERATION).forEach((el) => (el.dataset.operationRole = el.innerText));

	// 버튼 별 이벤트 부착
	addEvent($(DIGIT_WRAPPER), 'click', onClickDigit);
	addEvent($(MODIFIER), 'click', onClickModifier);
	addEvent($(OPERATION_WRAPPER), 'click', onClickOperation);
};

init();
