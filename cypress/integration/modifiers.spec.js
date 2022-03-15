import { MODIFIER, INIT_STATE } from '../../src/js/constants.js';

describe('수정자들', () => {
  it(`AC(All Clear)버튼을 누르면 ${INIT_STATE.currentTotal}으로 초기화 한다.`, () => {
    cy.clickDigit('6');
    cy.clickDigit('2');
    cy.clickModifier(MODIFIER.allClear);
    cy.totalShouldBe(INIT_STATE.currentTotal);
  });
});
