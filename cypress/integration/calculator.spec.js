import { DEFAULT_TOTAL_VALUE, OPERATORS, MESSAGES } from '../../src/js/constants.js';

function onNumberClick(numbers) {
	numbers.split('').forEach((number) => {
		cy.get('.digit').contains(number).click();
	});
}

function onOperatorClick(operator) {
	cy.get('.operations').contains(operator).click();
}

describe('calculator test', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
		onNumberClick('1');
		onOperatorClick(OPERATORS.PLUS);
		onNumberClick('1');
		onOperatorClick(OPERATORS.EQUAL);

		cy.get('#total').should('have.text', '2');
	});

	it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
		onNumberClick('10');
		onOperatorClick(OPERATORS.MINUS);
		onNumberClick('9');
		onOperatorClick(OPERATORS.EQUAL);

		cy.get('#total').should('have.text', '1');
	});

	it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
		onNumberClick('2');
		onOperatorClick(OPERATORS.MULTIPLE);
		onNumberClick('2');
		onOperatorClick(OPERATORS.EQUAL);

		cy.get('#total').should('have.text', '4');
	});

	it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
		onNumberClick('8');
		onOperatorClick(OPERATORS.DIVISION);
		onNumberClick('2');
		onOperatorClick(OPERATORS.EQUAL);

		cy.get('#total').should('have.text', '4');
	});

	it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
		cy.get('#reset').click();
		cy.get('#total').should('have.text', DEFAULT_TOTAL_VALUE);
	});

	it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
		onNumberClick('1000');
		cy.on('window:alert', (message) => {
			expect(message).to.contains(MESSAGES.ERROR100);
		});
		onOperatorClick(OPERATORS.DIVISION);
		onNumberClick('1000');
	});

	it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
		onNumberClick('7');
		onOperatorClick(OPERATORS.DIVISION);
		onNumberClick('3');
		onOperatorClick(OPERATORS.EQUAL);

		cy.get('#total').should('have.text', '2');
	});
});
