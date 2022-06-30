import { CALCULATOR, TOTAL, dataSelector, MODIFIER } from '../../src/js/selectors';
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

	it('click modifier and single digit changes total to digit', () => {
		const INITIAL_TOTAL_NUM = '0';
		for (let i = 0; i <= 9; i++) {
			cy.get(MODIFIER).click();
			cy.get(TOTAL).invoke('text').should('eq', INITIAL_TOTAL_NUM);
			cy.get(dataSelector('digit-number', `${i}`))
				.should('have.text', `${i}`)
				.click();
			cy.get(TOTAL).should('have.text', `${i}`);
		}
	});
});
