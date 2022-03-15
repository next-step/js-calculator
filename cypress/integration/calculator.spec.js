import {ALERT_MAX_NUMBER_LENGTH_MESSAGE} from '../../src/js/constants/index.js';

beforeEach(() => {
	cy.visit('/');
});

describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
	it('23 + 47 = 70', () => {
		cy.checkTotal(0)
			.inputDigits(23)
			.clickOperator('+')
			.inputDigits(47)
			.clickOperator('=')
			.checkTotal(70);
	});
});

describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
	it('30 - 47 = -17', () => {
		cy.checkTotal(0)
			.inputDigits(30)
			.clickOperator('-')
			.inputDigits(47)
			.clickOperator('=')
			.checkTotal(-17);
	});
});

describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
	it('10 X 47 = 470', () => {
		cy.checkTotal(0)
			.inputDigits(10)
			.clickOperator('X')
			.inputDigits(47)
			.clickOperator('=')
			.checkTotal(470);
	});
});

describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
	it('21 / 7 = 3', () => {
		cy.checkTotal(0)
			.inputDigits(21)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(3);
	});
});

describe('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
	it(`
		21 / 7 = 3
		AC = 0
	`, () => {
		cy.checkTotal(0)
			.inputDigits(21)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(3)
			.clickModifier('AC')
			.checkTotal(0);
	});
});

describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
	it('213(4) - 113(4) = 100', () => {
		const stub = cy.stub();

		cy.on('window:alert', stub);

		cy.checkTotal(0)
			.inputDigits(2134)
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith(
					ALERT_MAX_NUMBER_LENGTH_MESSAGE,
				);
			})
			.checkTotal(213)
			.clickOperator('-')
			.inputDigits(1134)
			.then(() => {
				expect(stub.getCall(1)).to.be.calledWith(
					ALERT_MAX_NUMBER_LENGTH_MESSAGE,
				);
			})
			.clickOperator('=')
			.checkTotal(100);
	});
});

describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
	it('20 / 7 = 2', () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(2);
	});

	it(`
		3 - 23 = -20
		/ 7 = -2
	`, () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperator('-')
			.inputDigits(23)
			.clickOperator('=')
			.checkTotal(-20)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(-2);
	});
});

describe('계산 결과에 이어 숫자를 클릭하면, 새로운 연산이 가능하다.', () => {
	it(`
		20 / 7 = 2
		20 + 20 = 40
	`, () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(2)
			.inputDigits(20)
			.clickOperator('+')
			.inputDigits(20)
			.clickOperator('=')
			.checkTotal(40);
	});
});

describe('계산 결과에 이어 연산자를 클릭하면, 계산 결과에 이어서 추가적으로 연산이 가능하다.', () => {
	it(`
		20 / 7 = 2
		+ 20 = 22
		- 20 = 2
		X 8 = 16
		/ 4 = 4
	`, () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(2)
			.clickOperator('+')
			.inputDigits(20)
			.clickOperator('=')
			.checkTotal(22)
			.clickOperator('-')
			.inputDigits(20)
			.clickOperator('=')
			.checkTotal(2)
			.clickOperator('X')
			.inputDigits(8)
			.clickOperator('=')
			.checkTotal(16)
			.clickOperator('/')
			.inputDigits(4)
			.clickOperator('=')
			.checkTotal(4);
	});
});

describe('계산 결과에 이어 `=` 연산자를 클릭하면, 이전 계산 결과가 계속 나타난다.', () => {
	it(`
		20 / 7 = 2
		= 2
		= 2
	`, () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperator('/')
			.inputDigits(7)
			.clickOperator('=')
			.checkTotal(2)
			.clickOperator('=')
			.checkTotal(2);
	});
});

describe('3개의 숫자에 대해 연산이 가능하다.', () => {
	it('23 + 47 + 30 = 100', () => {
		cy.checkTotal(0)
			.inputDigits(23)
			.clickOperator('+')
			.inputDigits(47)
			.clickOperator('+')
			.inputDigits(30)
			.clickOperator('=')
			.checkTotal(100);
	});

	it('2 + 4 X 10 = 42', () => {
		cy.checkTotal(0)
			.inputDigits(2)
			.clickOperator('+')
			.inputDigits(4)
			.clickOperator('X')
			.inputDigits(10)
			.clickOperator('=')
			.checkTotal(42);
	});

	it('3 + 17 / 2 = 11', () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperator('+')
			.inputDigits(17)
			.clickOperator('/')
			.inputDigits(2)
			.clickOperator('=')
			.checkTotal(11);
	});

	it('3 * 5 / 2 = 7', () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperator('X')
			.inputDigits(5)
			.clickOperator('/')
			.inputDigits(2)
			.clickOperator('=')
			.checkTotal(7);
	});
});
