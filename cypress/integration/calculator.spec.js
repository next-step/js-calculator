import { ERROR_MESSEAGE, RESTRICTIONS, TEST } from '../../src/constants';
import { setAliase } from '../support/util';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('/');
    setAliase();
  });

  const typeTestAndShowResult = (testRex) => {
    [...testRex].forEach((elm) => {
      cy.contains('button', elm).click();
    });
    cy.get('@operationEqual').click();
  };

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    const result = 123 + 456;

    typeTestAndShowResult(TEST.PLUS_TEST);

    cy.get('@total').should('have.text', result);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    const result = 123 - 456;

    typeTestAndShowResult(TEST.MINUS_TEST);

    cy.get('@total').should('have.text', result);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    const result = 123 * 456;

    typeTestAndShowResult(TEST.MULTIPLY_TEST);

    cy.get('@total').should('have.text', result);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const result = 500 / 5;

    typeTestAndShowResult(TEST.DIVIDE_TEST);

    cy.get('@total').should('have.text', result);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const result = RESTRICTIONS.INITAL_VALUE;

    [...TEST.AC_TEST].forEach((elm) => {
      cy.contains('button', elm).click();
    });
    cy.get('@modifier').click();

    cy.get('@total').should('have.text', result);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    [...TEST.THREE_LENGTH_NUMBER].forEach((s) => {
      cy.contains('button', s).click();
    });

    cy.contains('button', '4').click();

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERROR_MESSEAGE.INVAILD_DIGIT_LENGTH
    );
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const result = Math.floor(5 / 2);

    typeTestAndShowResult(TEST.DIVIDE_TEST_FLOOR);

    cy.get('@total').should('have.text', result);
  });
});
