import { store } from './store/calculator-store.js';
import { setNumberA, setNumberB, setOperation, setTotal, resetAll } from './action/calculator-actions.js';
import { add, minus, multiply, divide } from './calculate.js';

export const saveNumberToStore = function (value) {
	const { numberA, numberB, operation } = store.getState();
	if (operation) {
		store.dispatch(setNumberB(numberB + value));
	} else {
		store.dispatch(setNumberA(numberA + value));
	}
};

export const setOperationState = function (clickedOperation) {
	store.dispatch(setOperation(clickedOperation));
};

export const setTotalValue = function (operation) {
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

export const resetCalcultaor = () => {
	store.dispatch(resetAll());
};
