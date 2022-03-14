/* eslint-disable no-undef */
import { BASE_URL } from '../../src/js/consts.js';

beforeEach(() => {
  cy.visit(BASE_URL);
});

const calculate = (number1, operator, number2) => {
  cy.get(`[data-digit="${number1}"]`).click();
  cy.get(`[data-operation="${operator}"]`).click();
  cy.get(`[data-digit="${number2}"]`).click();

  cy.get('[data-operation="="]').click();
};

describe('사칙연산 테스트', () => {
  it('2개 덧셈', () => {
    calculate('4', '+', '2');
    cy.get('#total').should('have.text', '6');
  });

  it('2개 뺄셈', () => {
    calculate('4', '-', '2');
    cy.get('#total').should('have.text', '2');
  });

  it('2개 곱셈', () => {
    calculate('4', 'X', '2');
    cy.get('#total').should('have.text', '8');
  });

  it('2개 나눗셈', () => {
    calculate('4', '/', '2');
    cy.get('#total').should('have.text', '2');
  });
});

describe('올 클리어 테스트', () => {
  it('AC 누르면 0으로 초기화', () => {
    cy.get('[data-digit="2"]').click();
    cy.get('.modifiers').click();

    cy.get('#total').should('have.text', '0');
  });
});

describe('숫자 자리수 제한', () => {
  it('한 번에 최대 3자리수까지 입력 가능', () => {
    cy.get('[data-digit="2"]').click();
    cy.get('[data-digit="2"]').click();
    cy.get('[data-digit="2"]').click();
    cy.get('[data-digit="2"]').click();

    cy.get('#total').should('have.text', '222');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('3자리 이하로 입력하세요');
    });
  });
});

describe('계산 결과 표현', () => {
  it('계산 결과를 표현할때는 소수점 이하는 버림한다.', () => {
    calculate('7', '/', '3');
    cy.get('#total').should('have.text', '2');
  });
});
