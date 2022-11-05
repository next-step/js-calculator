describe('DOM Test', () => {
  it('Type Test', () => {
    cy.visit('http://localhost:5500');

    cy.get('.digit')[0].click();
    cy.get('#total').should('have.value', '1');
  });
});
