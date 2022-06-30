import { CALCULATOR, TOTAL, dataSelector, MODIFIER } from '../../src/js/selectors';
// [] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// [] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// [] 계산 결과를 표현할 때 소수점 이하는 버림한다.

describe('calculator-spec', () => {
	it('calculator is rendered on index.html', () => {
		cy.visit('/index.html');
		cy.get(CALCULATOR);
	});

	// AC 버튼을 클릭한 후 숫자 버튼을 입력하면 결과창이 입력한 숫자로 바뀐다.
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
