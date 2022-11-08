class Calculator {
	result = 0;
	current = 0;
	operator = "";

	add() {
		this.result += Number(this.current);
	}

	substract() {
		this.result -= Number(this.current);
	}

	multiply() {
		this.result *= Number(this.current);
	}

	divide() {
		this.result = Math.floor(this.result / Number(this.current));
	}

	allClear() {
		this.current = 0;
		this.result = 0;
		this.operator = "";
	}
}

export const calculator = new Calculator();
