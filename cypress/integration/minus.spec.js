import { OPERATION } from '../../src/js/constants.js';

describe('빼기 연산', () => {
  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('1');
  });

  it('3개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit('6');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('1');
  });

  it('4개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickDigit('9');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('1');
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('3');
  });
});
