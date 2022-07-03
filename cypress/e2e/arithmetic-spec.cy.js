import { add, minus, multiply, divide } from '../../src/js/calculate';

describe('arithmetic operation test', () => {
	it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
		const result = add('1', '2');
		expect(result).to.equal('3');
	});

	it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
		const result = minus('2', '1');
		expect(result).to.equal('1');
	});

	it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
		const result = multiply('50', '2');
		expect(result).to.equal('100');
	});

	it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
		const result = divide('12', '5');
		expect(result).to.equal('2');
	});
});
