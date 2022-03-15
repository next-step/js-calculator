import { OPERATION } from '../../src/js/constants.js';

describe('복잡한 연산', () => {
  it('더하기와 곱셈이 섞인 연산', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('37');
  });

  it('더하기와 빼기가 섞인 연산', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('4');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('13');
  });

  it('빼기와 곱셈이 섞인 연산', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('-13');
  });

  it('빼기와 나누기가 섞인 연산', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('1');
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('9');
  });

  it('곱하기와 나누기가 섞인 연산', () => {
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('1');
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('6');
  });
});
