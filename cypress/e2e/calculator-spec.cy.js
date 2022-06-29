import { CALCULATOR, TOTAL, DIGIT_WRAPPER } from '../../src/js/constants/selectors';
// [] 2개의 숫자에 대해 덧셈이 가능하다.
// [] 2개의 숫자에 대해 뺄셈이 가능하다.
// [] 2개의 숫자에 대해 곱셈이 가능하다.
// [] 2개의 숫자에 대해 나눗셈이 가능하다.
// [] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// [] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// [] 계산 결과를 표현할 때 소수점 이하는 버림한다.

describe('calculator-spec', () => {
	it('calculator is rendered on index.html', () => {
		cy.visit('/index.html');
		cy.get(CALCULATOR);
	});

	it('clicked digit added to total', () => {
		cy.get(TOTAL).should('have.text', 0);
		cy.get(DIGIT_WRAPPER);
		// .click((e) => cy.log(e));
	});
});
