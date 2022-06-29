// 사칙연산 함수 테스트
import { add, minus, multiply, divide } from '../../src/js/calculate';

describe('arithmetic operation test', () => {
	it('add two numbers', () => {
		const result = add(1, 2);
		expect(result).to.equal(3);
	});

	it('minus two numbers', () => {
		const result = minus(2, 1);
		expect(result).to.equal(1);
	});

	it('multiply two numbers', () => {
		const result = multiply(50, 2);
		expect(result).to.equal(100);
	});

	it('divide two numbers', () => {
		const result = divide(99, 3);
		expect(result).to.equal(33);
	});
});
