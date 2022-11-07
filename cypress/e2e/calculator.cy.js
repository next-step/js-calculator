const handleClick = {
  number: (num) => cy.get('.digit').contains(num).click(),
  operator: (op) => cy.get('.operation').contains(op).click(),
  clear: () => cy.get('.modifier').contains('AC').click(),
};
const getTotalValue = (text) => cy.get('#total').should('have.text', text);

beforeEach(() => {
  cy.visit('/');
});

