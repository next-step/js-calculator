import { OPERATION } from '../../src/js/constants.js';

describe('나누기 연산', () => {
  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('2');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('2');
  });

  it('3개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit('9');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('2');
  });

  it('4개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickDigit('9');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('3');
  });
});
