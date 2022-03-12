import {ALERT_MAX_NUMBER_LENGTH_MESSAGE} from '../../src/js/constants/index.js';

beforeEach(() => {
	cy.visit('/');
});

describe('calculator', () => {
	it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
		cy.checkTotal(0)
			.inputDigits(23)
			.clickOperation('+')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(70);
	});

	it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
		cy.checkTotal(0)
			.inputDigits(30)
			.clickOperation('-')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(-17);
	});

	it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
		cy.checkTotal(0)
			.inputDigits(10)
			.clickOperation('X')
			.inputDigits(47)
			.clickOperation('=')
			.checkTotal(470);
	});

	it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
		cy.checkTotal(0)
			.inputDigits(21)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(3);
	});

	it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
		cy.checkTotal(0)
			.inputDigits(21)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.clickModifier('AC')
			.checkTotal(0);
	});

	it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
		const stub = cy.stub();

		cy.on('window:alert', stub);

		cy.checkTotal(0)
			.inputDigits(2134)
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith(
					ALERT_MAX_NUMBER_LENGTH_MESSAGE,
				);
			})
			.checkTotal(213);
	});

	it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
		cy.checkTotal(0)
			.inputDigits(20)
			.clickOperation('/')
			.inputDigits(7)
			.clickOperation('=')
			.checkTotal(2);
	});

	it('계산 결과에 이어 숫자를 클릭하면, 새로운 연산이 가능하다.', () => {
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

	it('계산 결과에 이어 연산자를 클릭하면, 계산 결과에 이어서 추가적으로 연산이 가능하다.', () => {
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

	it('계산 결과에 이어 `=` 연산자를 클릭하면, 이전 계산 결과가 계속 나타난다.', () => {
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
