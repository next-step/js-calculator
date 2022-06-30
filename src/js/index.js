import { $$ } from './util.js';
import {DIGIT, OPERATION, TOTAL} from './selectors.js';

// 버튼 데이터 초기화
(() => {
	const digitList = $$(DIGIT);
	const operationList = $$(OPERATION);
	digitList.forEach((el) => (el.dataset.digitNumber = el.innerText));
	operationList.forEach((el) => (el.dataset.operationRole = el.innerText));
})();

/* 
	필요한 함수들 정의
	정의 후 각 파일로 모듈화 할 생각입니다.
*/
const updateTotalValue = function (value) {
	const total = $(TOTAL)
	total.innerText = value;
}