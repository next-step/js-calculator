import { CALCULATOR, TOTAL, dataSelector, MODIFIER } from '../../src/js/selectors';

describe('calculator-spec', () => {
	it('계산기가 메인 화면에 렌더링된다.', () => {
		cy.visit('/index.html');
		cy.get(CALCULATOR);
	});

	it('AC(All Clear)버튼을 누르면 결과값을 0으로 초기화 한다.', () => {
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

	it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {});

	it('한번에 숫자를 4자리 수 이상 입력하면 alert 창이 뜬다.', () => {});

	it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {});

	it('2개의 숫자에 대해 덧셈이 가능하다.', () => {});

	it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {});

	it('2개의 숫자에 대해 곱셈이 가능하다.', () => {});

	it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {});
});
