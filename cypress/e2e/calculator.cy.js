import { OPERATION, ALRERT_MESSAGE } from '../../src/js/constants.js';

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit([2, 2]);
    cy.clickOperation(OPERATION.PLUS);
    cy.clickDigit([2, 2, 2]);
    cy.clickOperation(OPERATION.EQUAL);

    cy.calculation(244);
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('300 - 20 = 280', () => {
      cy.clickDigit([3, 0, 0]);
      cy.clickOperation(OPERATION.MINUS);
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(280);
    });
    it('10 - 20 = -10', () => {
      cy.clickDigit([1, 0]);
      cy.clickOperation(OPERATION.MINUS);
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(-10);
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('2 * 0 = 0', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(0);
    });
    it('0 * 2 = 0', () => {
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(0);
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('2 / 0 = Infinity', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(Infinity);
    });
    it('555 / 2 = 277', () => {
      cy.clickDigit([5, 5, 5]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(277);
    });
    it('30 / 2 = 15', () => {
      cy.clickDigit([3, 0]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.calculation(15);
    });
  });
});
