import { store } from './store/calculator-store.js';
import { setTotalValue, setOperationState, saveNumberToStore, resetCalcultaor } from './model.js';

export const onClickModifier = function (ev) {
	resetCalcultaor();
};

export const onClickDigit = function (ev) {
	const clickedValue = ev.target.dataset.digitNumber;
	saveNumberToStore(clickedValue);
};

export const onClickOperation = function (ev) {
	const { numberA, numberB } = store.getState();
	if (!numberA && !numberB) return;
	const clickedOperation = ev.target.dataset.operationRole;
	if (clickedOperation === '=') {
		setTotalValue(store.getState().operation);
	}
	setOperationState(clickedOperation);
};
