describe('calculator test', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('add two number', () => {
    cy.getByDataset('1').click();
    cy.getByDataset('total').should('have.text', '1');

    cy.getByDataset('+').click();
    cy.getByDataset('total').should('have.text', '1+');

    cy.getByDataset('2').click();
    cy.getByDataset('total').should('have.text', '1+2');

    cy.getByDataset('=').click();
    cy.getByDataset('total').should('have.text', '3');
  });
});
