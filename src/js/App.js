import { $total } from './util/dom.js';
import {
	PLUS_SIGN,
	MINUS_SIGN,
	MULTIPLICATION_SIGN,
	DIVISION_SIGN,
	EQUAL_SIGN,
	ERROR_MSG,
} from './util/constants.js';
import { isValidMaxLength } from './util/utils.js';

class App {
	constructor() {
		this.firstValue = '';
		this.secondValue = '';
		this.result = 0;
		this.operator = '';
	}

	render() {
		$total.innerText = this.result
			? this.result
			: `${this.firstValue} ${this.operator} ${this.secondValue}`;
	}

	allClear() {
		this.firstValue = '';
		this.secondValue = '';
		this.operator = '';
		this.result = '0';
		this.render();
	}

	digits(e) {
		const digit = e.target.innerText;

		if (this.operator === '') {
			if (!isValidMaxLength(this.firstValue)) {
				alert(ERROR_MSG.INVALID_MAX_LENGTH);
				return;
			}
			this.firstValue += digit;
			this.render();
			return;
		}

		if (!isValidMaxLength(this.secondValue)) {
			alert(ERROR_MSG.INVALID_MAX_LENGTH);
			return;
		}
		this.secondValue += digit;
		this.render();
	}

	setOperator(e) {
		if (!this.firstValue) {
			alert(ERROR_MSG.INVALID_VALUE);
			return;
		}

		if (e.target.innerText === EQUAL_SIGN) {
			this.calculate();
			this.render();
		}

		this.operator = e.target.innerText;
		this.render();
	}

	calculate() {
		this.firstValue = Number(this.firstValue);
		this.secondValue = Number(this.secondValue);

		switch (this.operator) {
			case PLUS_SIGN:
				this.result = this.firstValue + this.secondValue;
				break;
			case MINUS_SIGN:
				this.result = this.firstValue - this.secondValue;
				break;
			case MULTIPLICATION_SIGN:
				this.result = this.firstValue * this.secondValue;
				break;
			case DIVISION_SIGN:
				this.result = Math.floor(this.firstValue / this.secondValue);
				break;
			default:
		}
	}
}

export default App;
