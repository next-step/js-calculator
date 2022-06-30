import { $, $$ } from './util.js';
import {DIGIT, OPERATION} from './selectors.js';

// 버튼 데이터 초기화
(() => {
	const digitList = $$(DIGIT);
	const operationList = $$(OPERATION);
	digitList.forEach((el) => (el.dataset.digitNumber = el.innerText));
	operationList.forEach((el) => (el.dataset.operationRole = el.innerText));
})();
