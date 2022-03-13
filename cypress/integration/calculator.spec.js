import {ALERT_MAX_NUMBER_LENGTH_MESSAGE} from '../../src/js/constants/index.js';

beforeEach(() => {
	cy.visit('/');
});

describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
	it('23 + 47 = 70', () => {
		cy.checkTotal(0)
			.inputDigits(23)
			.clickOperation('+')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(70);
	});
});

describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
	it('30 - 47 = -17', () => {
		cy.checkTotal(0)
			.inputDigits(30)
			.clickOperation('-')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(-17);
	});
});

describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
	it('10 X 47 = 470', () => {
		cy.checkTotal(0)
			.inputDigits(10)
			.clickOperation('X')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(470);
	});
});

describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
	it('21 / 7 = 3', () => {
		cy.checkTotal(0)
			.inputDigits(21)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
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
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
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
			.clickOperation('-')
			.inputDigits(1134)
			.then(() => {
				expect(stub.getCall(1)).to.be.calledWith(
					ALERT_MAX_NUMBER_LENGTH_MESSAGE,
				);
			})
			.clickOperation('=')
			.checkTotal(100);
	});
});

describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
	it('20 / 7 = 2', () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(2);
	});

	it(`
		3 - 23 = -20
		/ 7 = -2
	`, () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperation('-')
			.inputDigits(23)
			.clickOperation('=')
			.checkTotal(-20)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
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
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(2)
			.inputDigits(20)
			.clickOperation('+')
			.inputDigits(20)
			.clickOperation('=')
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
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(2)
			.clickOperation('+')
			.inputDigits(20)
			.clickOperation('=')
			.checkTotal(22)
			.clickOperation('-')
			.inputDigits(20)
			.clickOperation('=')
			.checkTotal(2)
			.clickOperation('X')
			.inputDigits(8)
			.clickOperation('=')
			.checkTotal(16)
			.clickOperation('/')
			.inputDigits(4)
			.clickOperation('=')
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
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(2)
			.clickOperation('=')
			.checkTotal(2);
	});
});

describe('3개의 숫자에 대해 연산이 가능하다.', () => {
	it('23 + 47 + 30 = 100', () => {
		cy.checkTotal(0)
			.inputDigits(23)
			.clickOperation('+')
			.inputDigits(47)
			.clickOperation('+')
			.inputDigits(30)
			.clickOperation('=')
			.checkTotal(100);
	});

	it('2 + 4 X 10 = 42', () => {
		cy.checkTotal(0)
			.inputDigits(2)
			.clickOperation('+')
			.inputDigits(4)
			.clickOperation('X')
			.inputDigits(10)
			.clickOperation('=')
			.checkTotal(42);
	});

	it('3 + 17 / 2 = 11', () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperation('+')
			.inputDigits(17)
			.clickOperation('/')
			.inputDigits(2)
			.clickOperation('=')
			.checkTotal(11);
	});

	it('3 * 5 / 2 = 7', () => {
		cy.checkTotal(0)
			.inputDigits(3)
			.clickOperation('X')
			.inputDigits(5)
			.clickOperation('/')
			.inputDigits(2)
			.clickOperation('=')
			.checkTotal(7);
	});
});
