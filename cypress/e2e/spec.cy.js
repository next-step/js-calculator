describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('9 + 5 = 14', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(4)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '14');
  });
  it('179 + 43 = 222', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(4)').click();
    cy.get('.digit:nth-child(6)').click();
    cy.get('.digit:nth-child(7)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '222');
  });
});
