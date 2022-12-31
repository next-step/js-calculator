/// <reference types="cypress" />

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html');
    cy.reload();
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('#digits').contains('4').click();
    cy.get('#digits').contains('5').click();
    cy.get('#operations').contains('+').click();
    cy.get('#digits').contains('1').click();
    cy.get('#digits').contains('0').click();
    cy.get('#operations').contains('=').click();

    cy.get('#total').should('have.text', 55);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('#digits').contains('4').click();
    cy.get('#digits').contains('5').click();
    cy.get('#operations').contains('-').click();
    cy.get('#digits').contains('1').click();
    cy.get('#digits').contains('0').click();
    cy.get('#operations').contains('=').click();

    cy.get('#total').should('have.text', 35);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('#digits').contains('1').click();
    cy.get('#digits').contains('0').click();
    cy.get('#operations').contains('x').click();
    cy.get('#digits').contains('3').click();
    cy.get('#digits').contains('2').click();
    cy.get('#operations').contains('=').click();

    cy.get('#total').should('have.text', 320);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('#digits').contains('9').click();
    cy.get('#digits').contains('0').click();
    cy.get('#operations').contains('/').click();
    cy.get('#digits').contains('2').click();
    cy.get('#operations').contains('=').click();

    cy.get('#total').should('have.text', 45);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('#digits').contains('2').click();
    cy.get('#operations').contains('+').click();
    cy.get('#digits').contains('3').click();
    cy.get('#operations').contains('+').click();
    cy.get('#digits').contains('4').click();

    cy.get('#modifier').click();
    cy.get('#total').should('have.text', 0);

    cy.get('#digits').contains('2').click();
    cy.get('#operations').contains('+').click();
    cy.get('#digits').contains('3').click();
    cy.get('#operations').contains('=').click();
    cy.get('#total').should('have.text', 5);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('#digits').contains('9').click();
    cy.get('#digits').contains('0').click();
    cy.get('#digits').contains('5').click();
    cy.get('#digits').contains('8').click();

    cy.get('#total').should('have.text', 905);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('#digits').contains('1').click();
    cy.get('#digits').contains('3').click();
    cy.get('#operations').contains('/').click();
    cy.get('#digits').contains('3').click();
    cy.get('#operations').contains('=').click();

    cy.get('#total').should('have.text', 4);
  });
})
