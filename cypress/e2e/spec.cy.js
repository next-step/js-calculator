describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('1').click();
    cy.get('#total').should('have.text', '9+1');
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '10');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('.digit').contains('7').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('2').click();
    cy.get('#total').should('have.text', '7-2');
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '5');
  });

  it('2개의 숫자에 대해 곱셉이 가능하다.', () => {
    cy.get('.digit').contains('7').click();
    cy.get('.operation').contains('X').click();
    cy.get('.digit').contains('7').click();
    cy.get('#total').should('have.text', '7X7');
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '49');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('0').click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('0').click();
    cy.get('#total').should('have.text', '100/10');
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '10');
  });
});
