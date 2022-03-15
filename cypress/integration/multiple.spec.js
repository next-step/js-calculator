import { OPERATION } from '../../src/js/constants.js';

describe('곱하기 연산', () => {
  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('6');
  });

  it('3개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clickDigit('6');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('36');
  });

  it('4개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clickDigit('9');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('1');
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('594');
  });
});
