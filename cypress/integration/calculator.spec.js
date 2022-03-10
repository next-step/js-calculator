describe('js-calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digits > .digit').contains('1').click();
    cy.contains('+').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('.digits > .digit').contains('3').click();
    cy.contains('-').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', '1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('.digits > .digit').contains('3').click();
    cy.contains('X').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', '6');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('.digits > .digit').contains('6').click();
    cy.contains('/').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.digits > .digit').contains('6').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('AC').click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('.digits > .digit').contains('6').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.get('#total').should('have.text', '622');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('.digits > .digit').contains('1').click();
    cy.get('.digits > .digit').contains('2').click();
    cy.contains('/').click();
    cy.get('.digits > .digit').contains('5').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', '2');
  });
});
