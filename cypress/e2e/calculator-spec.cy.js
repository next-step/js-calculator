import { CALCULATOR, TOTAL, dataSelector, MODIFIER } from '../../src/js/selectors.js';
import { NUMBER_LENGTH_ALERT_MSG } from '../../src/constants.js';

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

	// 계산 결과 관련 테스트마다 값 0으로 초기화
	afterEach(() => {
		const INITIAL_TOTAL_NUM = '0';
		cy.get(MODIFIER).click();
		cy.get(TOTAL).invoke('text').should('eq', INITIAL_TOTAL_NUM);
	});

	it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
		cy.get(dataSelector('digit-number', '3')).click();
		cy.get(dataSelector('digit-number', '9')).click();
		cy.get(dataSelector('digit-number', '1')).click();
		cy.get(dataSelector('digit-number', '8')).click();
		cy.on('window:alert', (t) => {
			expect(t).to.contains(NUMBER_LENGTH_ALERT_MSG);
		});
	});

	// it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
	// 	cy.get(TOTAL)
	// 	cy.get(dataSelector('digit-number', '3')).click();
	// 	cy.get(dataSelector('operation-role', '+'))
	// });

	// it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {});

	// it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {});

	// it('2개의 숫자에 대해 곱셈이 가능하다.', () => {});

	// it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {});
});
