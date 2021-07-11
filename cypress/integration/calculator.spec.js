// calculator.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />

describe('계산기 앱', () => {
	beforeEach(() => {
		cy.visit('http://localhost:1234');
	});
	describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
		it('1+1=2', () => {
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('button', { name: /\+/i }).click();
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '2');
		});
	});
	describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
		it('1-2=-1', () => {
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('button', { name: /\-/i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '-1');
		});
	});
	describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
		it('2*2=4', () => {
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /x/i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '4');
		});
	});
	describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
		it('4/2=2', () => {
			cy.findByRole('button', { name: /4/i }).click();
			cy.findByRole('button', { name: /\//i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '2');
		});
	});
	describe('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
		it('123 입력 후 ac를 입력하면 0이 돤다.', () => {
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '1');
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '12');
			cy.findByRole('button', { name: /3/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '123');
			cy.findByRole('button', { name: /ac/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '0');
		});
	});
	describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
		it('123 입력 후 4를 입력하면 에러메시지가 나타난다.', () => {
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /3/i }).click();
			cy.findByRole('button', { name: /4/i }).click();
			// alert test 방법
			cy.on('window:alert', (txt) => {
				expect(txt).to.contains('숫자는 최대 3자리수만 입력 가능합니다.');
			});

			cy.findByRole('heading', { level: 1 }).should('have.text', '123');
		});
	});
	describe('한번에 한가지 연산만 가능하다.', () => {
		it('123 입력 후 ++를 입력하면 에러메시지가 나타나고 123+가 남는다.', () => {
			cy.findByRole('button', { name: /1/i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /3/i }).click();
			cy.findByRole('button', { name: /\+/i }).click();
			cy.findByRole('button', { name: /\+/i }).click();
			// alert test 방법
			cy.on('window:alert', (txt) => {
				expect(txt).to.contains('한 번에 하나의 연산만 할 수 있습니다.');
			});

			cy.findByRole('heading', { level: 1 }).should('have.text', '123+');
		});
	});
	describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
		it('5/2=2', () => {
			cy.findByRole('button', { name: /5/i }).click();
			cy.findByRole('button', { name: /\//i }).click();
			cy.findByRole('button', { name: /2/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '2');
		});
		it('4/3=1', () => {
			cy.findByRole('button', { name: /4/i }).click();
			cy.findByRole('button', { name: /\//i }).click();
			cy.findByRole('button', { name: /3/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '1');
		});
		it('7/3=2', () => {
			cy.findByRole('button', { name: /7/i }).click();
			cy.findByRole('button', { name: /\//i }).click();
			cy.findByRole('button', { name: /3/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '2');
		});
		it('7/4=1', () => {
			cy.findByRole('button', { name: /7/i }).click();
			cy.findByRole('button', { name: /\//i }).click();
			cy.findByRole('button', { name: /4/i }).click();
			cy.findByRole('button', { name: /\=/i }).click();
			cy.findByRole('heading', { level: 1 }).should('have.text', '1');
		});
	});
});
