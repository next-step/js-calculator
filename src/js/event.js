import { operationHandler, saveNumberToStore, resetCalcultaor } from './model.js';

export const onClickModifier = function () {
	resetCalcultaor();
};

export const onClickDigit = function (ev) {
	const clickedValue = ev.target.dataset.digitNumber;
	saveNumberToStore(clickedValue);
};

export const onClickOperation = function (ev) {
	const clickedOperation = ev.target.dataset.operationRole;
	operationHandler(clickedOperation);
};
