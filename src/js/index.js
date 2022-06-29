import { $, $$ } from './util.js';

// 버튼 데이터 초기화
(() => {
	const digitList = $$('.digit');
	const operationList = $$('.operation');
	digitList.forEach((el) => (el.dataset.digitNumber = el.innerText));
	operationList.forEach((el) => (el.dataset.operationRole = el.innerText));
})();
