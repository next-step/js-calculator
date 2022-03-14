import { OPERATION } from '../../src/js/constants.js';

describe('더하기 연산', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('3');
  });

  it('3개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('6');
  });

  it('4개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('1');
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('21');
  });
});
